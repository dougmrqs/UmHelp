from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# ************* #
# DISCOUNTS API #
# ************* #
discountsURL = "http://localhost:3003"
# POST /bestdiscount finds the best discount
# POST /newdiscount posts a new discount on db
# ************* #

# ************* #
# CLEANINGS API #
# ************* #
cleaningsURL = "http://localhost:3002"
# POST /requestcleaning posts a cleaning request
# POST /getcleaning gets all cleaning requests
# ************* #


@app.route('/price', methods=['POST'])
def price():
    data = request.form
    try:
        response = requests.post(cleaningsURL+"/price", data)
    except:
        response = "404"
    # print("\n", response, "\n",)
    return (response.text)


#####################################################################
@app.route('/discounts', methods=['POST'])
def postdiscounts():
    data = request.form
    print("\n", data, "\n")
    try:
        response = requests.post(discountsURL+"/newdiscount", data)
    except:
        response.text = "404"
    return response.text

@app.route('/discounts', methods=['GET'])
def getdiscounts():
    try:
        response = requests.get(discountsURL+"/getdiscount")
    except:
        response.text = "404"
    return response.text

@app.route('/discounts', methods=['PATCH'])
def patchdiscounts():
    data = request.form
    print("\n", data, "\n")
    try:
        response = requests.patch(discountsURL+"/patchdiscount", data)
    except:
        response.text = "404"
    return response.text

@app.route('/discounts', methods=['PUT'])
def putdiscounts():
    data = request.form
    try:
        response = requests.put(discountsURL+"/putdiscount", data)
    except:
        response.text = "404"
    return response.text

@app.route('/discounts', methods=['DELETE'])
def deletediscounts():
    data = request.form
    try:
        response = requests.delete(discountsURL+"/deletediscount", data=data)
    except:
        response.text = "404"
    return response.text


###########################################
@app.route('/requests', methods=['POST'])
def requests_post():
    data = request.form
    print("\n", data, "\n")
    try:
        response = requests.post(cleaningsURL+"/requestcleaning", data)
    except:
        response.text = "404"
    return response.text


@app.route('/requests', methods=['GET'])
def requests_get():
    response = requests.get(cleaningsURL+"/getcleaning")
    return response.text


@app.route('/requests', methods=['DELETE'])
def requests_delete():
    data = request.form
    print(data)
    response = requests.delete(cleaningsURL+"/deletecleaning", data=data)
    return response.text


@app.route('/requests', methods=['PUT'])
def requests_put():
    data = request.form
    response = requests.put(cleaningsURL+"/putcleaning", data=data)
    return response


@app.route('/requests', methods=['PATCH'])
def requests_patch():
    data = request.form
    response = requests.patch(cleaningsURL+"/patchcleaning", data=data)
    return response
