# Create a list where every element is a dictinory of people and their houses
people =[
    {"name": "Harry", "house": "Gryffindor"},
    {"name": "Cho", "house": "Ravenclaw"},
    {"name": "Draco", "house": "Slytherin"}
]

#Define a function that tells python how to sort the list/dictionaries
def f(person):
    return person["name"]

people.sort(key=f)
print(people)

# You can also tell python how to sort the list/dictionaries with lambda
# person = input , person["name"] = output 
people.sort(key =lambda person: person["name"])
print(people )