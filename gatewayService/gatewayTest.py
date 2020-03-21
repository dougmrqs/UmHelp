import requests

baseURL = 'http://localhost:5000'

response = requests.post(baseURL+'/price')
print ("Route POST /price :", response)

response = requests.post(baseURL+'/discounts')
print ("Route POST /discounts :", response)

response = requests.get(baseURL+'/requests')
print ("Route GET /requests :", response)
response = requests.post(baseURL+'/requests')
print ("Route POST /requests :", response)
response = requests.patch(baseURL+'/requests')
print ("Route PATCH /requests :", response)
response = requests.put(baseURL+'/requests')
print ("Route PUT /requests :", response)
response = requests.delete(baseURL+'/requests')
print ("Route DELETE /requests :", response)