from flask import Flask, render_template, send_file, redirect, request, session
import os

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True


# Maps every route to the coresponding file
routes = {"chess":"chess", "rotating-cube":"rotatingCube",
    "rubicks-cube-v1":"rubicksCubeV1", "rubicks-cube-v2":"rubicksCubeV2",
    "grandpa-gift-card":"giftCard"}



@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html", static="static/index", paths=routes.keys())


@app.route('/<path>')
def render_project(path):
    """ Path of any project """

    # Bug. Fix it to return 404 to go to @app.errorhandler(404)
    # if path not in routes: return render_template("404.html")
    
    name = routes[path]
    return render_template(name+".html", static="static/"+name)


@app.route('/favicon.ico')
def favicon():
    return send_file("favicon.jpg")

@app.errorhandler(404)
def page_not_found(e):
    # print("THIS IS THE ERROR:", e)
    return render_template("404.html", error_msg=e)

@app.errorhandler(500)
def server_error(e):
    return render_template("500.html", error_msg=e)


if __name__ == "__main__":
    app.run(host="localhost", port=80)
