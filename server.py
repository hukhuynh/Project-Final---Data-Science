
import pickle
pickle_in = open("wordDict.pickle","rb")
wordDict = pickle.load(pickle_in)

from keras.models import model_from_json

def tempFuncLetter(str):
    return "Prediction based on letters"
# def tempFuncWord(str):
#     return "Prediction based on words"

# # load json and create model
# json_file = open('model_letter.json', 'r')
# loaded_model_json = json_file.read()
# json_file.close()
# loaded_letter = model_from_json(loaded_model_json)
# # load weights into new model
# loaded_letter.load_weights("model_letter.h5")
# print("Loaded model from disk")
# json_file.close()

# load json and create model
json_file = open('model_word.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_word = model_from_json(loaded_model_json)
# load weights into new model
loaded_word.load_weights("model_word.h5")
print("Loaded model from disk")
json_file.close()

from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api, reqparse
from json import dumps
from flask_jsonpify import jsonify

import numpy as np

import re

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
        if temp['type'] == 'letter':
            data['text'] = tempFuncLetter(temp['text'])
            #data['text'] = loaded_letter.predict(temp['text'])
        elif temp['type'] == 'word':
            # data['text'] = tempFuncWord(temp['text'])
            row = str(temp['text'])
            row = re.sub('[^\w]',' ', row).split()
            pattern = [wordDict[string] for string in row]
            pattern = pattern[0:20]
            text_gen=""
            for i in range(20):
                x = np.reshape(pattern,(1,len(pattern),1))
                x = x/float(len(wordDict))
                prediction = loaded_word.predict(x,verbose=0)
                index = np.random.choice(len(prediction),p=prediction)
                result = wordDict[index]
                text_gen = text_gen+' '+result
            data['text'] = text_gen
        else:
            data['text'] = 'please chose a model type'
        data['type'] = temp['type']
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