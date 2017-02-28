class Calendar

	attr_accessor :date

	def initialize(date = nil)
		date == nil ? (@date = Time.now) : (@date = Date.parse(date))
		puts @date
	end

	def calendarStart
		month = @date.strftime("%m").to_i
		year = @date.strftime("%Y").to_i
		firstOfMonth = Date.new(year, month, 1).strftime("%w")
		daysInMonth = Time.days_in_month(month)
		weeks = ((daysInMonth + firstOfMonth.to_f)/7).ceil
		
		days = []

		i = daysInMonth
		daysInMonth.times do
			days << i
			i -= 1
		end

		firstOfMonth.to_i.times do
			days << nil
		end

		calendar = []

		weeks.times do
			week = []
			7.times do
				week << days.pop
			end
			calendar << week
		end
		monthName = @date.strftime("%B") + " " + year.to_s
		[calendar, monthName]

	end

	def nextMonth
		@date.next_month
	end

	def prevMonth
		@date.prev_month 
	end

end