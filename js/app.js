var app = new Vue({
  el: "#app",
  data: {
		items: []
  },
	methods: {
		addItem: function() {
            var n = this.items.length;
			var item = {
                time: "11:00",
				name: "Беги, Форест, беги " + n,
				check: false
            }
			this.items.push(item);
		},
		removeItem: function(index) {
console.log(this.items[index].check);			
            this.items.splice(index,1);
		},
		clearList: function() {
			this.items = [];
		}
	}
});

