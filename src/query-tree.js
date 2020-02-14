import { Query } from './query'

/**
 * Performs CRUD operations on a query tree
 */
export default class QueryTree {
  
  constructor(root, options) { 
    this.options = options || {};
    this.options.containers = options.containers || [];
    this.root = root || {};
  }

  /**
   * Container nodes contain query operators (GE, CONTAINS, AND, etc).
   * 
   * @param query 
   */
  isContainerQuery(query) {
    return this.options.containers.indexOf(query.name) > -1;
  }

  /**
   * When a query node has only one argument, it will be removed from the parent and its
   * children will adopted by the parent
   * 
   * @param query 
   */
  adoptChildren(query) {
    let parent = query.parent;
    if (parent) {
      const index = parent.args.indexOf(query);

      if (index > -1) {          
        parent.args.splice(index, 1);
        query.args.forEach(child => child.parent = parent);
        parent.args.splice.apply(parent.args, [index, 0].concat(query.args));

        if (parent.args.length < 2) {
          if (!this.isContainerQuery(parent)) {
            this.adoptChildren(parent);
          } else if (parent.args.length === 0) {
            this.deleteQuery(parent);
          }
        }        
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
    const index = parent.args.indexOf(query);
    
    if (index > -1) {
      parent.args.splice(index, 1);
      query.parent = null;

      if (parent.args.length < 2) {
        this.adoptChildren(parent);
      }
    }
  }

  /**
   * Searches the Query tree by applying the input condition.
   * If condition function returns true, the corresponding query is returned, null otherwise
   * 
   * @param fnFilter 
   */
  search(fnFilter) {
    function search(query) {
      if (!query || !(query instanceof Query)) {
        return null;
      };

      if (fnFilter.apply(this, [query.name, query.args])) {
        return query;
      }
      
      let i = 0;
      let found = null;    
      let args = query.args || [];

      for (; i < args.length && !found; i++) {
        found = search.apply(this, [args[i]]);
      }

      return found;
    }
    
    return search.apply(this, [this.root]);
  };

}
