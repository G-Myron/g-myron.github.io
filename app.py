from flask import Flask, redirect, render_template, request, session
import os

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True


# Maps every rout to the coresponding file
routes = {"chess":"chess", "rotating-cube":"rotatingCube",
    "rubicks-cube-1":"rubicksCubeV1", "rubicks-cube-2":"rubicksCubeV2"}



@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html", static="static/index", paths=routes.keys())


@app.route('/<path>')
def render_project(path):
    """ Path of any project """
    name = routes[path]
    return render_template(name+".html", static="static/"+name)



if __name__ == "__main__":
    app.run(host="localhost", port=80)
