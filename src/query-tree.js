import Query from './query'

/**
 * Performs CRUD operations on a query tree
 */
export default class QueryTree {
  
  constructor(root, options) { 
    const theOptions = options || {};
    this._options = theOptions;
    this._options.containers = theOptions.containers || [];
    this._root = root || new Query('and');
  }

  /**
   * VIP queries are nodes that can have only one child and are immediate children of root.
   * 
   * @param query 
   */
  __isContainerQuery(query) {
    return this._options.containers.indexOf(query.name) > -1;
  }

  __hasContainers() {
    return this._options.containers.length > 0;
  }

  /**
   * When a query node has only one argument, it will be removed from the parent and its
   * children will adopted by the parent
   * 
   * @param query 
   */
  __adoptChildren(query) {
    let parent = query.parent;
    if (parent) {
      const index = parent.args.indexOf(query);

      if (index > -1) {          
        parent.args.splice(index, 1);
        query.args.forEach(child => child.parent = parent);
        parent.args.splice.apply(parent.args, [index, 0].concat(query.args));

        if (parent.args.length < 2) {
          if (!this.__isContainerQuery(parent)) {
            this.__adoptChildren(parent);
          } else if (parent.args.length === 0) {
            this.__deleteContainerQuery(parent);
          }
        }        
      }

    }
  }

  /**
   * Adds a query to the given parent, if no parent is given, the query will be added to the root.
   * 
   * @param {*} parent 
   * @param {*} query 
   */
  addQuery(parent, query) {
    let theParent = parent == null ? this._root : parent;   
    theParent.args = (theParent.args || []).concat(query);
    query.parent = theParent;
  }
  
  /**
   * Finds the parent and adds a new query.
   * 
   * @param fnCriteria - criteria to find the parent
   * @param query 
   */
  findAndAddQuery(fnCriteria, query) {
    const parent = this.search(fnCriteria);
    if (parent) {
      this.addQuery(parent, query);
      return;
    }

    console.error("Could not find parent query to add child.");
  }

  /**
   * Find an exisgting query and update/replace its args
   * 
   * @param fnCriteria - criteria to find the query
   * @param newArgs - new values
   */
  findAndUpdateQuery(fnCriteria, newArgs) {
    let target = this.search(fnCriteria);
    if (target) {
      target.args = newArgs;
      return;
    }

    console.error("Could not find query to delete.");
  }

  __deleteContainerQuery(query) {
    let parent = query.parent;
    if (parent && this.__isContainerQuery(query)) {
      const index = parent.args.indexOf(query);
      if (index > -1) {
        parent.args.splice(index, 1);
        query.parent = null;
      }
    }
  }

  /**
   * Deletes the input query from the tree.
   * 
   * @param query 
   */
  deleteQuery(query) {
    let parent = query.parent;
    if (!parent) return;

    const index = parent.args.indexOf(query);
    
    if (index > -1) {
      parent.args.splice(index, 1);
      query.parent = null;

      if (parent.args.length < 2) {
        if (this.__isContainerQuery(parent)) {
          if (parent.args.length < 1) {
            this.__deleteContainerQuery(parent);
          }
        } else {
          this.__adoptChildren(parent);
        }        
      }
    }
  }

  /**
   * FInd an existing query and deletes it.
   * 
   * @param fnCriteria - criteria to find the query
   */
  findAndDeleteQuery(fnCriteria) {
    const query = this.search(fnCriteria);
    if (query) {
      this.deleteQuery(query);
      return;
    }

    console.error("Could not find query to delete.")
  }

    
  /**
   * Traverses the Query tree and calls the visitor callback.
   * 
   * @param fnVisitor - visitor callback must be of the form : (query) => {...}
   */

  visit(fnVisitor) {
    function __visit(query) {
      if (!query || !(query instanceof Query)) {
        return;
      };

      fnVisitor.call(this, query);
            
      let i = 0;
      let args = query.args || [];

      for (; i < args.length; i++) {
        __visit.call(this, args[i]);
      }

    }
    
    __visit.call(this, this._root);    
  }
  
  /**
   * Searches the Query tree by applying the input filter.
   * If filter function returns true, the corresponding query is returned, null otherwise
   * 
   * @param fnCriteria - applied to each query node and must be of the form : (name, args, parent) => <criteria>
   */

  search(fnCriteria) {
    function __search(query) {
      if (!query || !(query instanceof Query)) {
        return null;
      };

      if (fnCriteria.apply(this, [query.name, query.args, query.parent])) {
        return query;
      }
      
      let i = 0;
      let found = null;    
      let args = query.args || [];

      for (; i < args.length && !found; i++) {
        found = __search.apply(this, [args[i]]);
      }

      return found;
    }
    
    return __search.apply(this, [this._root]);    
  }

  serialize() {
    return Query.serializeArgs(this._root, ',');
  }

  asTree(query) {
    return new QueryTree(query, this.options);
  }

  get root() {
    return this._root;
  }

  set root(value) {
    this._root = value;
  }
}
