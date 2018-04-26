
import pickle
#letter dictionaries
pickle_in = open("letterDict.pickle","rb")
wordDict = pickle.load(pickle_in)
pickle_in.close()

pickle_in = open("dictLetter.pickle","rb")
dictWord = pickle.load(pickle_in)
pickle_in.close()

#word dictionaries
pickle_in = open("wordDict.pickle","rb")
wordDict = pickle.load(pickle_in)
pickle_in.close()

pickle_in = open("dictWord.pickle","rb")
dictWord = pickle.load(pickle_in)
pickle_in.close()


from keras.models import model_from_json


# # load json and create model
json_file = open('model_letter.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_letter = model_from_json(loaded_model_json)
# # load weights into new model
loaded_letter.load_weights("model_letter.h5")
print("Loaded model from disk")
json_file.close()

# load json and create model
json_file = open('model_word.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_word = model_from_json(loaded_model_json)
# load weights into new model
loaded_word.load_weights("model_word.h5")
print("Loaded model from disk")
json_file.close()
loaded_word.compile(loss='categorical_crossentropy',optimizer='adam')

from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api, reqparse
from json import dumps
from flask_jsonpify import jsonify

import numpy as np
import random
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
            initial_text = str(temp['text'])
            initial_text = re.sub('[^\w]',' ', initial_text).split()
            pattern = []
            #used if words entered are not in dictionary
            for string in initial_text:
                if string in wordDict:
                    pattern.append(wordDict[string])
                else:
                    pattern.append(random.randint(1,len(wordDict)-1))
            #used if user enters less than 5 words
            if len(pattern) < 5:
                for i in range(len(pattern),5):
                    pattern.append(random.randint(1,len(wordDict)-1))

            pattern = pattern[0:5]
            text_gen=""
            for i in range(5):
                x = np.reshape(pattern,(1,len(pattern),1))
                x = x/float(len(wordDict))
                prediction = loaded_word.predict(x,verbose=0)
                prediction = prediction[0]
                index = np.random.choice(len(prediction),p=prediction)
                result = dictWord[index]
                text_gen = text_gen+' '+result
            data['text'] = temp['text'] + text_gen
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