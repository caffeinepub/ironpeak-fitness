import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";

actor {
  type Difficulty = {
    #Beginner;
    #Intermediate;
    #Advanced;
  };

  type Program = {
    id : Nat;
    name : Text;
    description : Text;
    duration : Nat;
    difficulty : Difficulty;
    category : Text;
    isPopular : Bool;
  };

  module Program {
    public func compare(p1 : Program, p2 : Program) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  type Trainer = {
    id : Nat;
    name : Text;
    specialty : Text;
    bio : Text;
    certifications : [Text];
    yearsExperience : Nat;
  };

  module Trainer {
    public func compare(t1 : Trainer, t2 : Trainer) : Order.Order {
      Nat.compare(t1.id, t2.id);
    };
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compare(c1 : ContactSubmission, c2 : ContactSubmission) : Order.Order {
      Nat.compare(c1.id, c2.id);
    };
  };

  type Result = {
    #ok;
    #err : Text;
  };

  let programs = List.fromArray<Program>([
    {
      id = 1;
      name = "Strength Training";
      description = "Build muscle and improve strength with guided routines.";
      duration = 12;
      difficulty = #Intermediate;
      category = "Strength";
      isPopular = true;
    },
    {
      id = 2;
      name = "HIIT";
      description = "High-intensity interval training for maximum calorie burn.";
      duration = 8;
      difficulty = #Advanced;
      category = "Cardio";
      isPopular = true;
    },
    {
      id = 3;
      name = "Yoga & Flexibility";
      description = "Improve flexibility and reduce stress with yoga practices.";
      duration = 10;
      difficulty = #Beginner;
      category = "Flexibility";
      isPopular = false;
    },
    {
      id = 4;
      name = "Cardio Blast";
      description = "Intense cardio workouts for all fitness levels.";
      duration = 6;
      difficulty = #Beginner;
      category = "Cardio";
      isPopular = false;
    },
    {
      id = 5;
      name = "CrossFit";
      description = "Varied functional movements for overall strength and endurance.";
      duration = 14;
      difficulty = #Advanced;
      category = "Strength";
      isPopular = true;
    },
    {
      id = 6;
      name = "Nutrition Coaching";
      description = "Personalized nutrition plans to complement your fitness goals.";
      duration = 4;
      difficulty = #Beginner;
      category = "Nutrition";
      isPopular = false;
    },
  ]);

  let trainers = List.fromArray<Trainer>([
    {
      id = 1;
      name = "Chris Walker";
      specialty = "Strength Training";
      bio = "Over 10 years of experience in helping clients build muscle and improve performance.";
      certifications = ["ACE Certified Personal Trainer", "NSCA Strength Coach"];
      yearsExperience = 10;
    },
    {
      id = 2;
      name = "Jessica Lee";
      specialty = "Yoga & Flexibility";
      bio = "Certified yoga instructor focusing on flexibility and holistic wellness.";
      certifications = ["RYT 200 Yoga Teacher"];
      yearsExperience = 7;
    },
    {
      id = 3;
      name = "Michael Johnson";
      specialty = "HIIT & CrossFit";
      bio = "Passionate about high-intensity training and functional fitness.";
      certifications = ["CrossFit Level 1", "NASM Certified Trainer"];
      yearsExperience = 8;
    },
    {
      id = 4;
      name = "Samantha Kim";
      specialty = "Nutrition & General Fitness";
      bio = "Expert in nutrition planning and personalized workout routines.";
      certifications = ["Certified Nutrition Specialist", "ACE Personal Trainer"];
      yearsExperience = 6;
    },
  ]);

  let contacts = Map.empty<Nat, ContactSubmission>();

  public query ({ caller }) func getPrograms() : async [Program] {
    programs.toArray().sort();
  };

  public query ({ caller }) func getTrainers() : async [Trainer] {
    trainers.toArray().sort();
  };

  var contactId = 1;

  public shared ({ caller }) func submitContact(name : Text, email : Text, subject : Text, message : Text) : async Result {
    if (name.size() == 0) { return #err("Name cannot be empty!") };
    if (subject.size() == 0) { return #err("Subject must be provided!") };
    if (message.size() == 0) { return #err("Message must be provided!") };

    let contact : ContactSubmission = {
      id = contactId;
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };

    contacts.add(contactId, contact);
    contactId += 1;

    #ok;
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contacts.values().toArray().sort();
  };
};
