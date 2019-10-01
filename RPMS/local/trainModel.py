#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Sep 15 05:28:00 2019

@author: yash
"""
import pandas as pd
import numpy as np

from sklearn.feature_selection import RFE

from sklearn.ensemble import ExtraTreesRegressor
from sklearn.metrics import explained_variance_score
from sklearn.metrics import mean_absolute_error

import pickle


dataframe=pd.read_csv("forestfires.csv")
dataframe.month.replace(('jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'),(1,2,3,4,5,6,7,8,9,10,11,12), inplace=True)
dataframe.day.replace(('mon','tue','wed','thu','fri','sat','sun'),(1,2,3,4,5,6,7), inplace=True)

dataset = dataframe.values

x = dataset[:,0:12]
y = dataset[:,12]

model = ExtraTreesRegressor()
rfe = RFE(model, 3)
fit = rfe.fit(x, y)

print("Number of Features: ", fit.n_features_)
print("Selected Features: ", fit.support_)
print("Feature Ranking: ", fit.ranking_)

num_instances = len(x)
name = "ExtraTreesRegressor"
model = ExtraTreesRegressor()
model.fit(x, y)

predictions = model.predict(x)

# Evaluate the model
score = explained_variance_score(y, predictions)
mae = mean_absolute_error(predictions, y)

msg = "%s: %f (%f)" % (name, score, mae)
print(msg)

from sklearn import metrics
from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2)
y_pred=model.predict(x_test)
print(np.sqrt(metrics.mean_squared_error(y_test, y_pred)))
print(model.predict([x_test[0]]))
print(y_test[0])


with open("model","wb") as outfile:
    pickle.dump(model, outfile)
'''
newModel = None
with open("model","rb") as infile:
    newModel = pickle.load(infile
'''