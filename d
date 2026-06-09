apiVersion: apps/v1
kind: Deployment
metadata:
  name: photo-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: photo-app
  template:
    metadata:
      labels:
        app: photo-app
    spec:
      containers:
      - name: photo-app
        image: venkataramana773/photo:v1
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        env:
        - name: MONGO_URI
          value: "mongodb://mongo:27017/artgallery"
