import sqlite3

class Watch(object):
	def __init__(self, **kwargs):
		self.variables = kwargs
	def set_variable(self, k, v):
		self.variables[k]=v
	def get_variable(self, k):
		return self.variables.get(k, None)
	def print_info(self):
		for k in self.variables:
			print k + ": " + str(self.variables[k])

class Family(object):
	def __init__(self, watchList):
		self.watchList=watchList

def addToDB(watch, db):
	db.execute('insert into watches (name, brand, refNumber, description) values (?, ?, ?, ?)', (watch.get_variable('name'), watch.get_variable('brand'), watch.get_variable('refNumber'), watch.get_variable('description')))
	db.commit

def main():
	db = sqlite3.connect('watches.db')
	
	tmp=Watch()
	tmp.set_variable('name', 'SpeedMaster')
	tmp.set_variable('brand', 'Omega')
	tmp.set_variable('refNumber', '145.012')
	tmp.set_variable('description', 'Used in the Apollo program')
	addToDB(tmp, db)
	tmp.set_variable('name', 'Submariner')
	tmp.set_variable('brand', 'Rolex')
	tmp.set_variable('refNumber', '5513')
	tmp.set_variable('description', 'Dive watch')
	addToDB(tmp, db)

	cursor=db.execute('select * from watches order by brand')
	for row in cursor:
		print(row)

	db.commit
if __name__ == '__main__':
	main()