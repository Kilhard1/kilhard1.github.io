
var sortByTime = function(d1, d2){
	if(d1.time < d2.time) {
		return -1;
	} else {
		return 1;
	}
};

var app = new Vue({
  el: "#app",
  data: {
	    modal: false,
		time: '',
		name: '',
		items: [],
		times: [ '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30' ]
  },
	methods: {
		addItemForm: function() {
			if( this.name == '' ) {
				alert("Нужно заполнить все поля");
				return
			};
			if( this.time == '' ) {
				alert("Нужно заполнить все поля");
				return
			};
			var item = {
                time: this.time,
				name: this.name,
				check: false
            }
			this.items.push(item);
			this.items.sort(sortByTime);
			this.time = '';
			this.name = '';
		},
		removeItem: function(index) {
            this.items.splice(index,1);
		},
		modalOn: function() {
			this.modal = true;
		},
		modalOff: function() {
			this.modal = false;
		},

	}
});

