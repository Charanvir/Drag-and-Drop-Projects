namespace App {
  // ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLElement> {
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputEl = this.element.querySelector(
        "#title"
      )! as HTMLInputElement;
      this.descriptionInputEl = this.element.querySelector(
        "#description"
      )! as HTMLInputElement;
      this.peopleInputEl = this.element.querySelector(
        "#people"
      )! as HTMLInputElement;
      this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputEl.value;
      const enteredDescription = this.descriptionInputEl.value;
      const enteredPeople = this.peopleInputEl.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert("Invalid input. Please try again!");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private clearInputs() {
      this.titleInputEl.value = "";
      this.descriptionInputEl.value = "";
      this.peopleInputEl.value = "";
    }

    @autoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
  }
}
