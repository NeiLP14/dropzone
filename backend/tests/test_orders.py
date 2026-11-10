from datetime import datetime, timedelta, timezone

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def create_drop(stock=5, opens_at=None):
    if opens_at is None:
        opens_at = datetime.now(timezone.utc) - timedelta(hours=1)

    response = client.post(
        "/drops",
        json={
            "product": "Nike Air Max",
            "price_cents": 18000,
            "stock": stock,
            "opens_at": opens_at.isoformat(),
        },
    )

    assert response.status_code == 201
    return response.json()


def test_order_decrements_stock():
    drop = create_drop(stock=5)

    response = client.post(f"/drops/{drop['id']}/orders")

    assert response.status_code == 201

    updated_drop = client.get(f"/drops/{drop['id']}").json()

    assert updated_drop["remaining"] == 4


def test_last_pair_sells_out_drop():
    drop = create_drop(stock=1)

    response = client.post(f"/drops/{drop['id']}/orders")

    assert response.status_code == 201

    updated_drop = client.get(f"/drops/{drop['id']}").json()

    assert updated_drop["remaining"] == 0
    assert updated_drop["status"] == "sold_out"


def test_order_sold_out_drop_is_rejected():
    drop = create_drop(stock=1)

    client.post(f"/drops/{drop['id']}/orders")

    response = client.post(f"/drops/{drop['id']}/orders")

    assert response.status_code == 409


def test_order_upcoming_drop_is_rejected():
    future_date = datetime.now(timezone.utc) + timedelta(days=1)

    drop = create_drop(stock=5, opens_at=future_date)

    response = client.post(f"/drops/{drop['id']}/orders")

    assert response.status_code == 409


def test_order_unknown_drop_is_rejected():
    response = client.post("/drops/999999/orders")

    assert response.status_code == 404