# File Processing

- Before run project (root directory):
>```mkdir storage/tsv_files ``` \*we will use this directory to push tsv files inside
- Install dependencies: 
>```npm install```
- Run redis
>```redis-server```
- Run nodemon: 
>```npm run dev```

- The client static files has build with ReactJS
>```cd client_src```
>```npm run start``` \*needs to run in different port than the backend
>```npm run build``` \*this compile in ./client folder

- To launch a pipeline in heroku
>>```git commit -am "Your commit." && git push heroku branch_name:master```

This project was configured to use mongodb as a database.