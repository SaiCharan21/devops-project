# Step 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx config (adds reverse proxy for /api → backend:5000)
COPY nginx.conf /etc/nginx/conf.d/default.conf


# copies your frontend build output from the Node.js build stage into the NGINX web server root, 
# so your app can be served in the final container
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
