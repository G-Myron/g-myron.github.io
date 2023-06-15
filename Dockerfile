FROM python:3.9

ADD . .

RUN pip install -r requirements.txt

CMD [ "python", "./app.py" , "--host", "0.0.0.0", "--port", "80"]
# CMD [ "flask", "run" , "--host", "0.0.0.0", "--port", "80"]


## Dockerfile is the blueprint to build Image
# docker build -t chess .
## Image is the template to run Container
# docker run -p 80:80 -it chess

## Delete all Containers and Images
# docker stop $(docker ps -aq)
# docker rm $(docker ps -aq)
# docker rmi $(docker images -q)

