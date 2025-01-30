/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 *  - allows for custom field transformations in the toJSON method (like formatting dates)
 */

const deleteAtPath = (obj, path, index) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  if (obj[path[index]]) {
    deleteAtPath(obj[path[index]], path, index + 1);
  }
};

const toJSON = (schema) => {
  let transform;

  // If there's already a custom transform defined in the schema, preserve it
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      // Loop through the schema paths to remove any "private" fields
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          // Recursively delete private fields in nested documents
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      // Replace _id with id and remove unwanted fields
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;

      // Custom field transformations
      if (ret.createdAt) {
        ret.createdAt = ret.createdAt.toLocaleString();
      }
      if (ret.updatedAt) {
        ret.updatedAt = ret.updatedAt.toLocaleString();
      }

      // Apply any custom transformation defined in the schema
      if (transform) {
        return transform(doc, ret, options);
      }

      return ret;
    },
  });
};

export { toJSON };
