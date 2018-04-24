from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api, reqparse
from json import dumps
from flask_jsonpify import jsonify

app = Flask(__name__)
api = Api(app)

CORS(app)

parser = reqparse.RequestParser()
parser.add_argument('text')    

data = {}
data['type'] = 'letter'
data['text'] = "Initial value from flask"
class Lyrics(Resource):   
    def get(self):
        return jsonify({'type':data['type'],'text':data['text']})
    def post(self):
        temp = request.json
        data['type'] = temp['type']
        data['text'] = temp['text']
        return temp

api.add_resource(Lyrics, '/lyrics')

# @app.route('/')
# @app.route("/lyrics", methods=['GET','POST'])
# def lyrics():
#     if request.method == 'POST':
#         temp = request.json
#     return temp



if __name__ == '__main__':
   app.run(port=5002)