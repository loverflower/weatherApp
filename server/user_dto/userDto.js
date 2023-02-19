module.exports = class UserDto {
  email;
  id;
  isActivated;
  options;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.is_activated;
    this.options = model.options;
  }
};
