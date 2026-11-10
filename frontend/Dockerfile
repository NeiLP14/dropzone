# Étape 1 : construction du frontend
FROM node:22-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application React/Vite
RUN npm run build


# Étape 2 : serveur Nginx
FROM nginx:alpine AS runtime

# Supprimer la configuration Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Installer la configuration Nginx du projet
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers compilés
COPY --from=builder /app/dist /usr/share/nginx/html

# Port exposé
EXPOSE 8080

# Démarrer Nginx au premier plan
CMD ["nginx", "-g", "daemon off;"]