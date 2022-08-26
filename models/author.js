let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength:100},
    family_name: {type: String, required: true, maxLength:100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for Author's full name
AuthorSchema
  .virtual('name')
  .get(function() {
    // To avoid errors in cases where either first name
    // or family name is missing, we set default value to ''
    let fullName = '';
    if (this.first_name && this.family_name) {
      fullName = `${this.first_name}, ${this.family_name}`;
    };
    if (!this.first_name || !this.family_name) {
      fullName = '';
    };
    return fullName;
  });

// Virtual for Author's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return `/catalog/author/${this._id}`;
  });

// Export Model
module.exports = mongoose.model('Author', AuthorSchema);