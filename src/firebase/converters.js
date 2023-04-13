class User {
    constructor( firstName, lastName , dateOfBirth, email, phoneNumber, role) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.role = role;
    }
    toString() {
      return (
        this.firstName +
        ", " +
        this.lastName +
        ", " +
        this.dateOfBirth +
        ", " +
        this.email +
        ", " +
        this.phoneNumber +
        ", " +
        this.role
      );
    }
  }

  class Trip {
    constructor( creator, driver ,regNum, from, to, passengers) {
      this.creator = creator;
      this.driver = driver;
      this.regNum = regNum;
      this.from = from;
      this.to = to;
      this.passengers = passengers;
    }
    toString() {
      return (
        this.creator +
        ", " +
        this.driver +
        ", " +
        this.regNum +
        ", " +
        this.from +
        ", " +
        this.to +
        ", " +
        this.passengers
      );
    }
  }
  
  // Firestore data converter
  export const userConverter = {
    toFirestore: (user) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(
        data.firstName,
        data.lastName,
        data.dateOfBirth,
        data.email,
        data.phoneNumber,
        data.role
      );
    },
  };

  export const tripConverter = {
    toFirestore: (trip) => {
      return {
        creator: trip.creator,
        driver: trip.driver,
        regNum: trip.regNum,
        from: trip.from,
        to: trip.to,
        passengers: trip.passengers,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Trip(
        data.creator,
        data.driver,
        data.regNum,
        data.from,
        data.to,
        data.passengers
      );
    },
  };