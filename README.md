### build
Build the frontend react-app first and sync to public folder insdie fronted, go to the backend folder and run index.js
```
cd frontend
npm run build
rsync -avP dist/* ../backend/public/.
cd ../backend
node index.js
```
