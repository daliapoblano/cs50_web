# classes are templates for an object
#class Point() will create a point with an x and y value
class Point():
    def __init__(self, x, y):
        self.x = x
        self.y = y

#creating a point
p = Point(2,8)
print(p.x)
print(p.y)

#object oriented programming
#creating a class for an airline that will make sure no planes are overbooked
class Flight():
    def __init__(self, capacity):
        self.capacity = capacity
        self.passengers = []

    def add_passenger(self, name):
        if not self.open_seats():
            return False
        self.passengers.append(name)
        return True

    #How many open seats there are
    def open_seats(self):
        return self.capacity - len(self.passengers)

flight = Flight(3)
people = ["Harry","Ron","Harmione","Ginny"]
for person in people:
    success = flight.add_passenger(person)
    if success:
        print(f"Added {person} to flight successfully.")
    else:
        print("No available seats for {person}")


