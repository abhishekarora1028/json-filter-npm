#Traverse and Filter Json Objects

NPM Package to go to all the elements of JSON Object ( any level deep ) and keep or remove the elements as given in the filters.

npm-json-traverse-filter works with following separators:

 = ( equals )
 
 != ( no equals )
 
For example:
```javascript
const traversefilter = require('npm-json-traverse-filter');

var jsonObject = {
  items: [
    { 
      foo:"bar1",
    	tel:"6868",
    	age:"23",
    	jobs:[
    	  {
    		  tech:"web",
    		  name: "c1",
    		  phone:[
    		      {
    		        home:'787878',
    		        ofc:'999999'
    		      },
              {
    		        home:'99999',
    		        ofc:'999999'
    		      }
    		  ],
    		  price: {
                    dutyFreeAmount: {
                        value: 0
                    }
                  }
    		  },
    		{
    		  tech:"php",
    		  name: "c2"
    		},
    		{
    		  tech:"node",
    		  name: "c3"
    		}
    	]
    }
    ]
};

var filters = ["items.jobs.phone.home=99999"];

var filteredObj = traversefilter.filterResponse(jsonObject, filters);

Response:

filteredObj = {
  items: [
    { 
      foo:"bar1",
    	tel:"6868",
    	age:"23",
    	jobs:[
    	  {
    		  tech:"web",
    		  name: "c1",
    		  phone:[
				{
    		        home:'99999',
    		        ofc:'999999'
    		    }
    		  ],
    		  price: {
                    dutyFreeAmount: {
                        value: 0
                    }
                  }
    		  },
    		{
    		  tech:"php",
    		  name: "c2"
    		},
    		{
    		  tech:"node",
    		  name: "c3"
    		}
    	]
    }
    ]
};
```
#Filter Recursively

You can also do the same filters recursively on the child objects if you have same body inside as an example below:

```javascript
const traversefilter = require('npm-json-traverse-filter');

var jsonObject = {
  items: [
    { 
      foo:"bar1",
    	tel:"6868",
    	age:"23",
    	jobs:[
    	  {
    		  tech:"web",
    		  name: "c1",
    		  phone:[
    		      {
    		        home:'787878',
    		        ofc:'999999'
    		      },
              {
    		        home:'99999',
    		        ofc:'999999'
    		      }
    		  ],
    		  price: {
                    dutyFreeAmount: {
                        value: 0
                    }
                  }
    		  },
    		{
    		  tech:"php",
    		  name: "c2"
    		},
    		{
    		  tech:"node",
    		  name: "c3"
    		}
    	],
		childItems:[
			{
				foo:"bar1",
				tel:"6868",
				age:"23",
				jobs:[
				  {
					  tech:"web",
					  name: "c1",
					  phone:[
						{
							home:'787878',
							ofc:'999999'
						},
						{
							home:'99999',
							ofc:'999999'
						}
					  ],
					  price: {
							dutyFreeAmount: {
								value: 0
							}
						  }
					  },
					{
					  tech:"php",
					  name: "c2"
					},
					{
					  tech:"node",
					  name: "c3"
					}
				]
			}
		]
    }
    ]
};

var filters = ["items.jobs.phone.home=99999"];

var filteredObj = traversefilter.filterResponse(jsonObject, filters, 'childItems');

Response:

filteredObj = {
  items: [
    { 
      foo:"bar1",
    	tel:"6868",
    	age:"23",
    	jobs:[
    	  {
    		  tech:"web",
    		  name: "c1",
    		  phone:[
				{
    		        home:'99999',
    		        ofc:'999999'
    		    }
    		  ],
    		  price: {
                    dutyFreeAmount: {
                        value: 0
                    }
                  }
    		  },
    		{
    		  tech:"php",
    		  name: "c2"
    		},
    		{
    		  tech:"node",
    		  name: "c3"
    		}
    	],
		childItems:[
			{
				foo:"bar1",
				tel:"6868",
				age:"23",
				jobs:[
				  {
					  tech:"web",
					  name: "c1",
					  phone:[
						{
							home:'99999',
							ofc:'999999'
						}
					  ],
					  price: {
							dutyFreeAmount: {
								value: 0
							}
						  }
					  },
					{
					  tech:"php",
					  name: "c2"
					},
					{
					  tech:"node",
					  name: "c3"
					}
				]
			}
		]
    }
    ]
};
```