let mongoose = require('mongoose');
let { DateTime } = require('luxon');

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
// Virtual for formatted date and time
AuthorSchema
  .virtual('date_of_birth_formatted')
  .get(function() {
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  });
AuthorSchema
  .virtual('date_of_death_formatted')
  .get(function() {
    return this.date_of_death ? 
      DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
      : '';
  });

// Export Model
module.exports = mongoose.model('Author', AuthorSchema);