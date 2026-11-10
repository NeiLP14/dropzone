
# ==========================================
# ETAPE 1 : installation des dépendances
# ==========================================
FROM python:3.12-slim AS builder

ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

WORKDIR /build

# Création d'un environnement Python isolé
RUN python -m venv $VIRTUAL_ENV

# Copier uniquement les dépendances
COPY requirements.txt .

# Installer les dépendances de production
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt


# ==========================================
# ETAPE 2 : image finale de l'API
# ==========================================
FROM python:3.12-slim AS runtime

ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Créer un utilisateur non-root
RUN groupadd --system appgroup \
    && useradd --system --gid appgroup appuser \
    && chown appuser:appgroup /app

# Récupérer les dépendances installées à l'étape 1
COPY --from=builder /opt/venv /opt/venv

# Copier uniquement le code de l'API
COPY --chown=appuser:appgroup app ./app

# Ne pas exécuter l'application en root
USER appuser

# Port utilisé par FastAPI
EXPOSE 8000

# Démarrer l'API
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
