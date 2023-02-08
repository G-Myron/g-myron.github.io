from flask import Flask, redirect, render_template, request, session
import os

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

domains = ["chess","rotating-cube"]

@app.route("/", methods=["GET", "POST"])
def index():
    name = "index"
    return render_template(name+".html", static="static/"+name, paths=domains)


@app.route("/"+domains[0])
def chess():
    name = "chess"
    return render_template(name+".html", static="static/"+name)


@app.route("/"+domains[1])
def rot_cube():
    name = "rotatingCube"
    return render_template(name+".html", static="static/"+name)




if __name__ == "__main__":
    app.run()
