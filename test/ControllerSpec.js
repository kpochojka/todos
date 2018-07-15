// describe('controller', function () {
// 	'use strict';

// 	var subject, model, view;

// 	var setUpModel = function (todos) {
// 		model.read.and.callFake(function (query, callback) {
// 			callback = callback || query;
// 			callback(todos);
// 		});

// 		model.getCount.and.callFake(function (callback) {

// 			var todoCounts = {
// 				active: todos.filter(function (todo) {
// 					return !todo.completed;
// 				}).length,
// 				completed: todos.filter(function (todo) {
// 					return !!todo.completed;
// 				}).length,
// 				total: todos.length
// 			};

// 			callback(todoCounts);
// 		});

// 		model.remove.and.callFake(function (id, callback) {
// 			callback();
// 		});

// 		model.create.and.callFake(function (title, callback) {
// 			callback();
// 		});

// 		model.update.and.callFake(function (id, updateData, callback) {
// 			callback();
// 		});
// 	};

// 	var createViewStub = function () {
// 		var eventRegistry = {};
// 		return {
// 			render: jasmine.createSpy('render'),
// 			bind: function (event, handler) {
// 				eventRegistry[event] = handler;
// 			},
// 			trigger: function (event, parameter) {
// 				eventRegistry[event](parameter);
// 			}
// 		};
// 	};

// 	beforeEach(function () {
// 		model = jasmine.createSpyObj('model', ['read', 'getCount', 'remove', 'create', 'update']);
// 		view = createViewStub();
// 		subject = new app.Controller(model, view);
// 	});
// 	//shows the applications inputs, empty todo array, becuase tasks not added
// 	it('should show entries on start-up', function () {
// 			var todo = {title: 'my todo'};
// 			setUpModel([todo]);
// 			subject.setView('');//empty tasks lists

// 			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);

// 	});

// 	describe('routing', function () {

// 		it('should show all entries without a route', function () {
// 			var todo = {title: 'my todo'};
// 			setUpModel([todo]);

// 			subject.setView('#/'); 

// 			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
// 		});

// 		it('should show all entries without "all" route', function () {
// 			var todo = {title: 'my todo'};
// 			setUpModel([todo]);

// 			subject.setView('#/'); //set state of total count of the tasks

// 			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
// 		});
// 		//shows not completed tasks (comleted = false)
// 		it('should show active entries', function () {
// 			var todo = {title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('#/active'); //set active state of view in URL

// 			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
// 			expect(todo.completed).toEqual(false);

// 		});
// 		//shows completed tasks (completed = true)
// 		it('should show completed entries', function () {
// 			var todo = {title: 'my todo', completed: true};
// 			setUpModel([todo]);

// 			subject.setView('#/completed'); //set completed state of view in URL

// 			expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
// 			expect(todo.completed).toEqual(true);
// 		});
// 	});
// 	describe('displaying', function () {
// 	//list of the created tasks is visibile
// 	it('should show the content block when todos exists', function () {
// 		setUpModel([{title: 'my todo', completed: true}]);

// 		subject.setView('');

// 		expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
// 			visible: true
// 		});
// 	});

// 	it('should hide the content block when no todos exists', function () {
// 		setUpModel([]);

// 		subject.setView('');

// 		expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
// 			visible: false
// 		});
// 	});

// 	it('should check the toggle all button, if all todos are completed', function () {
// 		setUpModel([{title: 'my todo', completed: true}]);

// 		subject.setView('');

// 		expect(view.render).toHaveBeenCalledWith('toggleAll', {
// 			checked: true
// 		});
// 	});

// 	it('should set the "clear completed" button', function () {
// 		var todo = {id: 42, title: 'my todo', completed: true};
// 		setUpModel([todo]);

// 		subject.setView('');

// 		expect(view.render).toHaveBeenCalledWith('clearCompletedButton', {
// 			completed: 1,
// 			visible: true
// 		});
// 	});
// 	//sets 'all' as default, takes total count, even if it's empty
// 	it('should highlight "All" filter by default', function () {
// 		var todo = {id: 42, title: 'my todo', total: true};
// 			setUpModel([todo]);

// 			subject.setView('');

// 		expect(view.render).toHaveBeenCalledWith('setFilter', '');
// 		expect(todo.total).toBeTruthy();
// 	});
// 	//choose not completed task, filter them and set them to the active state
// 	it('should highlight "Active" filter when switching to active view', function () {
// 		var todo = {id: 42, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('#/active');

// 		expect(view.render).toHaveBeenCalledWith('setFilter', 'active');
// 	});
// 	//toggle method - change the active state of the tasks
// 	describe('toggle all', function () {
// 		it('should toggle all todos to completed', function () {
// 			var todo = {id: 20, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			var parameter = {	completed: true };
// 			view.trigger('toggleAll', parameter);

// 			expect(model.update).toHaveBeenCalledWith(20, {completed: true}, jasmine.any(Function));
// 			expect(todo.completed).toEqual(false);

// 		});
// 	// toggle method - updates the model status as completed
// 		it('should update the view', function () {
// 			var todo = {id: 20, title: 'my todo', completed: true};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			var parameter = {	completed: false};
// 			view.trigger('toggleAll', parameter);

// 			expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 20, completed: false});
// 		});
// 	});

// 	});

// 	describe('new todo', function () {
// 		// adds new task to the list 
// 		it('should add a new todo to the model', function () {
// 			setUpModel([]);

// 			subject.setView('');

// 			var newTask = 'a new task to do';
// 			view.trigger('newTodo', newTask);

// 			expect(model.create).toHaveBeenCalledWith(newTask, jasmine.any(Function));
// 		});
// 		// displays new task on the list
// 		it('should add a new todo to the view', function () {

// 			setUpModel([]);

// 			subject.setView('');

// 			view.render.calls.reset();
// 			model.read.calls.reset();
// 			model.read.and.callFake(function (callback) {
// 				callback([{
// 					title: 'a new todo',
// 					completed: false
// 				}]);
// 			});

// 			view.trigger('newTodo', 'a new todo');

// 			expect(model.read).toHaveBeenCalled();

// 			expect(view.render).toHaveBeenCalledWith('showEntries', [{
// 				title: 'a new todo',
// 				completed: false
// 			}]);
// 		});

// 		it('should clear the input field when a new todo is added', function () {
// 			setUpModel([]);

// 			subject.setView('');

// 			view.trigger('newTodo', 'a new todo');

// 			expect(view.render).toHaveBeenCalledWith('clearNewTodo');
// 		});
// 	});

// 	describe('element removal', function () {
// 		// removes todo task
// 		it('should remove an entry from the model', function () {
// 			var todo = {id: 42, title: 'my todo', completed: true};
// 			setUpModel([todo]);

// 			subject.setView('');
// 			view.trigger('itemRemove', {id: 42});

// 			expect(model.remove).toHaveBeenCalledWith(42,  jasmine.any(Function));
// 		});

// 		it('should remove an entry from the view', function () {
// 			var todo = {id: 42, title: 'my todo', completed: true};
// 			setUpModel([todo]);

// 			subject.setView('');
// 			view.trigger('itemRemove', {id: 42});

// 			expect(view.render).toHaveBeenCalledWith('removeItem', 42);
// 		});

// 		it('should update the element count', function () {
// 			var todo = {id: 42, title: 'my todo', completed: true};
// 			setUpModel([todo]);

// 			subject.setView('');
// 			view.trigger('itemRemove', {id: 42});

// 			expect(view.render).toHaveBeenCalledWith('updateElementCount', 0);
// 		});
// 	});

// 	describe('remove completed', function () {
// 		it('should remove a completed entry from the model', function () {
// 			var todo = {id: 42, title: 'my todo', completed: true};
// 			setUpModel([todo]);

// 			subject.setView('');
// 			view.trigger('removeCompleted');

// 			expect(model.read).toHaveBeenCalledWith({completed: true}, jasmine.any(Function));
// 			expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
// 		});

// 		it('should remove a completed entry from the view', function () {
// 			var todo = {id: 42, title: 'my todo', completed: true};
// 			setUpModel([todo]);

// 			subject.setView('');
// 			view.trigger('removeCompleted');

// 			expect(view.render).toHaveBeenCalledWith('removeItem', 42);
// 		});
// 	});

// 	describe('element complete toggle', function () {
// 		it('should update the model', function () {
// 			var todo = {id: 21, title: 'my todo', completed: false};
// 			setUpModel([todo]);
// 			subject.setView('');

// 			view.trigger('itemToggle', {id: 21, completed: true});

// 			expect(model.update).toHaveBeenCalledWith(21, {completed: true}, jasmine.any(Function));
// 		});

// 		it('should update the view', function () {
// 			var todo = {id: 42, title: 'my todo', completed: true};
// 			setUpModel([todo]);
// 			subject.setView('');

// 			view.trigger('itemToggle', {id: 42, completed: false});

// 			expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 42, completed: false});
// 		});
// 	});

// 	describe('edit item', function () {
// 		it('should switch to edit mode', function () {
// 			var todo = {id: 21, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			view.trigger('itemEdit', {id: 21});

// 			expect(view.render).toHaveBeenCalledWith('editItem', {id: 21, title: 'my todo'});
// 		});

// 		it('should leave edit mode on done', function () {
// 			var todo = {id: 21, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			view.trigger('itemEditDone', {id: 21, title: 'new title'});

// 			expect(view.render).toHaveBeenCalledWith('editItemDone', {id: 21, title: 'new title'});
// 		});

// 		it('should persist the changes on done', function () {
// 			var todo = {id: 21, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			view.trigger('itemEditDone', {id: 21, title: 'new title'});

// 			expect(model.update).toHaveBeenCalledWith(21, {title: 'new title'}, jasmine.any(Function));
// 		});

// 		it('should remove the element from the model when persisting an empty title', function () {
// 			var todo = {id: 21, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			view.trigger('itemEditDone', {id: 21, title: ''});

// 			expect(model.remove).toHaveBeenCalledWith(21, jasmine.any(Function));
// 		});

// 		it('should remove the element from the view when persisting an empty title', function () {
// 			var todo = {id: 21, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			view.trigger('itemEditDone', {id: 21, title: ''});

// 			expect(view.render).toHaveBeenCalledWith('removeItem', 21);
// 		});

// 		it('should leave edit mode on cancel', function () {
// 			var todo = {id: 21, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			view.trigger('itemEditCancel', {id: 21});

// 			expect(view.render).toHaveBeenCalledWith('editItemDone', {id: 21, title: 'my todo'});
// 		});

// 		it('should not persist the changes on cancel', function () {
// 			var todo = {id: 21, title: 'my todo', completed: false};
// 			setUpModel([todo]);

// 			subject.setView('');

// 			view.trigger('itemEditCancel', {id: 21});

// 			expect(model.update).not.toHaveBeenCalled();
// 		});
// 	});
// });
/*global app, jasmine, describe, it, beforeEach, expect */

describe('controller', function () {
    'use strict';

    var subject, model, view;

    var setUpModel = function (todos) {
        model.read.and.callFake(function (query, callback) {
            callback = callback || query;
            callback(todos);
        });

        model.getCount.and.callFake(function (callback) {

            var todoCounts = {
                active: todos.filter(function (todo) {
                    return !todo.completed;
                }).length,
                completed: todos.filter(function (todo) {
                    return !!todo.completed;
                }).length,
                total: todos.length
            };

            callback(todoCounts);
        });

        model.remove.and.callFake(function (id, callback) {
            callback();
        });

        model.create.and.callFake(function (title, callback) {
            callback();
        });

        model.update.and.callFake(function (id, updateData, callback) {
            callback();
        });
    };

    var createViewStub = function () {
        var eventRegistry = {};
        return {
            render: jasmine.createSpy('render'),
            bind: function (event, handler) {
                eventRegistry[event] = handler;
            },
            trigger: function (event, parameter) {
                eventRegistry[event](parameter);
            }
        };
    };

    beforeEach(function () {
        model = jasmine.createSpyObj('model', ['read', 'getCount', 'remove', 'create', 'update']);
        view = createViewStub();
        subject = new app.Controller(model, view);
    });

    it('should show entries on start-up', function () {
        var todo = {title: 'my todo'};
        var todo2 = {title: 'my todo2'};
        var todo3 = {title: 'my todo3'};
        setUpModel([todo, todo2, todo3 ]);

        subject.setView('#/');

        expect(model.read).toHaveBeenCalled();

        expect(view.render).toHaveBeenCalledWith('showEntries', [
        	{title: 'my todo'},
            {title: 'my todo2'},
            {title: 'my todo3'}
            ]);
    });

    describe('routing', function () {

        it('should show all entries without a route', function () {
            var todo = {title: 'my todo'};
            setUpModel([todo]);

            subject.setView('');

            expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
        });

        it('should show all entries without "all" route', function () {
            var todo = {title: 'my todo'};
            setUpModel([todo]);

            subject.setView('#/');

            expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
        });

        it('should show active entries', function () {
            var todoArray = [
                {title: 'my todo', completed: true},
                {title: 'my todo2', completed: false},
                {title: 'my todo3', completed: true}
            ];
            setUpModel(todoArray);
            subject.setView('');

            expect(view.render).toHaveBeenCalledWith( 'toggleAll', Object({ checked: false }));
        });

        it('should show completed entries', function () {
            var todoArray = [
                {title: 'my todo', completed: true},
                {title: 'my todo2', completed: false},
                {title: 'my todo3', completed: true}
            ];
            setUpModel(todoArray);
            subject.setView('');

            expect(view.render).toHaveBeenCalledWith('clearCompletedButton', Object({ completed: 2, visible: true }) );
        });
    });

    it('should show the content block when todos exists', function () {
        setUpModel([{title: 'my todo', completed: true}]);

        subject.setView('');

        expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
            visible: true
        });
    });

    it('should hide the content block when no todos exists', function () {
        setUpModel([]);
        subject.setView('');

        expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
            visible: false
        });
    });

    it('should check the toggle all button, if all todos are completed', function () {
        setUpModel([{title: 'my todo', completed: true}]);

        subject.setView('');

        expect(view.render).toHaveBeenCalledWith('toggleAll', {
            checked: true
        });
    });

    it('should set the "clear completed" button', function () {
        var todo = {id: 42, title: 'my todo', completed: true};
        setUpModel([todo]);

        subject.setView('');

        expect(view.render).toHaveBeenCalledWith('clearCompletedButton', {
            completed: 1,
            visible: true
        });
    });

    it('should highlight "All" filter by default', function () {
        var todo = {title: 'my todo'};
        setUpModel([todo]);

        subject.setView('#/');
        expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', Object({ visible: true }));
    });

    it('should highlight "Active" filter when switching to active view', function () {
        var todos = [
            {id: 42, title: 'my todo', completed: true},
            {id: 43, title: 'my todo2', completed: false},
            {id: 44, title: 'my todo3', completed: true},
            {id: 45, title: 'my todo4', completed: false}
        ];
        setUpModel([todos]);

        subject.setView('#/active');
        expect(view.render).toHaveBeenCalledWith('showEntries',
                [
                    [ Object({ id: 42, title: 'my todo', completed: true }),
                    Object({ id: 43, title: 'my todo2', completed: false }),
                    Object({ id: 44, title: 'my todo3', completed: true }),
                    Object({ id: 45, title: 'my todo4', completed: false }) ]
                    ]
        );
        expect(view.render).toHaveBeenCalledWith('setFilter', 'active');
    });

    describe('toggle all', function () {
        it('should toggle all todos to completed', function () {
            var todo = [
                {id: 42, title: 'my todo', completed: true},
                {id: 43, title: 'my todo2', completed: false},
                {id: 44, title: 'my todo3', completed: true},
                {id: 45, title: 'my todo4', completed: false}
            ];

            setUpModel(todo);

            subject.setView('#/completed');

            expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', Object({ visible: true }));
            expect(view.render).toHaveBeenCalledWith('setFilter', 'completed');
        });

        it('should update the view', function () {
            var todo = [
                {id: 42, title: 'my todo', completed: false},
            ];

            setUpModel(todo);

            subject.setView('#/');
            view.trigger('itemToggle', {id: 42, completed: true});
            expect(view.render).toHaveBeenCalledWith('updateElementCount', 1);
            expect(view.render).toHaveBeenCalledWith('toggleAll', Object({ checked: false }) );
            expect(view.render).toHaveBeenCalledWith('elementComplete', Object({ id: 42, completed: true }) );
        });
    });

    describe('new todo', function () {
        it('should add a new todo to the model', function () {
            setUpModel([{id: 42, title: 'my todo'}]);
            subject.setView('');

            expect(view.render).toHaveBeenCalledWith( 'updateElementCount', 1);
            expect(view.render).toHaveBeenCalledWith( 'showEntries',  [ Object({ id: 42, title: 'my todo' }) ] );
        });

        it('should add a new todo to the view', function () {
            setUpModel([]);

            subject.setView('');

            view.render.calls.reset();
            model.read.calls.reset();
            model.read.and.callFake(function (callback) {
                callback([{
                    title: 'a new todo',
                    completed: false
                }]);
            });

            view.trigger('newTodo', 'a new todo');

            expect(model.read).toHaveBeenCalled();

            expect(view.render).toHaveBeenCalledWith('showEntries', [{
                title: 'a new todo',
                completed: false
            }]);
        });

        it('should clear the input field when a new todo is added', function () {
            setUpModel([]);

            subject.setView('');

            view.trigger('newTodo', 'a new todo');

            expect(view.render).toHaveBeenCalledWith('clearNewTodo');
        });
    });

    describe('element removal', function () {
        it('should remove an entry from the model', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);

            subject.setView('');
            model.remove(42, function(){});

            expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
        });

        it('should remove an entry from the view', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);

            subject.setView('');
            view.trigger('itemRemove', {id: 42});

            expect(view.render).toHaveBeenCalledWith('removeItem', 42);
        });

        it('should update the element count', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);

            subject.setView('');
            view.trigger('itemRemove', {id: 42});

            expect(view.render).toHaveBeenCalledWith('updateElementCount', 0);
        });
    });

    describe('remove completed', function () {
        it('should remove a completed entry from the model', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);

            subject.setView('');
            view.trigger('removeCompleted');

            expect(model.read).toHaveBeenCalledWith({completed: true}, jasmine.any(Function));
            expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
        });

        it('should remove a completed entry from the view', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);

            subject.setView('');
            view.trigger('removeCompleted');

            expect(view.render).toHaveBeenCalledWith('removeItem', 42);
        });
    });

    describe('element complete toggle', function () {
        it('should update the model', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);
            subject.setView('');

            view.trigger('itemToggle', {id: 21, completed: true});

            expect(model.update).toHaveBeenCalledWith(21, {completed: true}, jasmine.any(Function));
        });

        it('should update the view', function () {
            var todo = {id: 42, title: 'my todo', completed: true};
            setUpModel([todo]);
            subject.setView('');

            view.trigger('itemToggle', {id: 42, completed: false});

            expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 42, completed: false});
        });
    });

    describe('edit item', function () {
        it('should switch to edit mode', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);

            subject.setView('');

            view.trigger('itemEdit', {id: 21});

            expect(view.render).toHaveBeenCalledWith('editItem', {id: 21, title: 'my todo'});
        });

        it('should leave edit mode on done', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);

            subject.setView('');

            view.trigger('itemEditDone', {id: 21, title: 'new title'});

            expect(view.render).toHaveBeenCalledWith('editItemDone', {id: 21, title: 'new title'});
        });

        it('should persist the changes on done', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);

            subject.setView('');

            view.trigger('itemEditDone', {id: 21, title: 'new title'});

            expect(model.update).toHaveBeenCalledWith(21, {title: 'new title'}, jasmine.any(Function));
        });

        it('should remove the element from the model when persisting an empty title', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);

            subject.setView('');

            view.trigger('itemEditDone', {id: 21, title: ''});

            expect(model.remove).toHaveBeenCalledWith(21, jasmine.any(Function));
        });

        it('should remove the element from the view when persisting an empty title', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);

            subject.setView('');

            view.trigger('itemEditDone', {id: 21, title: ''});

            expect(view.render).toHaveBeenCalledWith('removeItem', 21);
        });

        it('should leave edit mode on cancel', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);

            subject.setView('');

            view.trigger('itemEditCancel', {id: 21});

            expect(view.render).toHaveBeenCalledWith('editItemDone', {id: 21, title: 'my todo'});
        });

        it('should not persist the changes on cancel', function () {
            var todo = {id: 21, title: 'my todo', completed: false};
            setUpModel([todo]);

            subject.setView('');

            view.trigger('itemEditCancel', {id: 21});

            expect(model.update).not.toHaveBeenCalled();
        });
    });
});
