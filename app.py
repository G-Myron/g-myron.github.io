from flask_session import Session
from flask import Flask, render_template, send_file, redirect, request, session
import os,json

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configure session to use filesystem instead of signed cookies
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


# Maps every route to the coresponding file
routes = {"chess":"chess", "rotating-cube":"rotatingCube",
    "rubicks-cube-v1":"rubicksCubeV1", "rubicks-cube-v2":"rubicksCubeV2",
    "grandpa-gift-card":"giftCard"}



@app.route("/", methods=["GET", "POST"])
def index():
    # print(session.get("chessState"))
    # session["Developer"] = "Myron"
    return render_template("index.html", static="static/index", paths=routes.keys())


@app.route('/chess', methods=["GET", "POST"])
def chess():
    """ Path of the chess project """
    # session.clear()

    if "state" not in session:
        print("Initial session")
        session["state"] = {}

    if request.method == 'POST':
        form = request.form
        args = request.args

        session["state"] = json.loads(request.data)
        print("State saved succesfully!")

    name = routes['chess']
    return render_template(name+".html", static="static/"+name, initialState=session["state"])


@app.route('/<path>')
def render_project(path):
    """ Path of any project """

    # Bug. Fix it to return 404 to go to @app.errorhandler(404)
    if not path in routes:
        return render_template("404.html", error_msg=path)

    name = routes[path]
    return render_template(name+".html", static="static/"+name)


@app.route('/favicon.ico')
def favicon():
    return send_file("favicon.jpg")

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html", error_msg=e)

@app.errorhandler(500)
def server_error(e):
    return render_template("500.html", error_msg=e)


if __name__ == "__main__":
    app.run(host="localhost", port=80)
