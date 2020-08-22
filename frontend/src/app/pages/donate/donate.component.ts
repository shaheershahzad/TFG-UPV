import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

declare const Stripe: any;
declare const M: any;

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  constructor(private authService: AuthService, public projectService: ProjectService) { }

  ngOnInit(): void {

    //Datepicker
    document.addEventListener('DOMContentLoaded', function() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var date = new Date(year - 18, month, day);

      var elems = document.querySelectorAll('.datepicker');
      var options = {
        autoClose: true,
        format: "dd/mm/yyyy",
        defaultDate: new Date(),
        setDefaultDate: true,
        //minDate: date
      }
      var instances = M.Datepicker.init(elems, options);
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });

    (<HTMLInputElement> document.getElementById("donerId")).value = this.authService.getUID();

    this.getProjects();

    // A reference to Stripe.js initialized with your real test publishable API key.
    /*var stripe = Stripe("pk_test_51H9zUmBSYWBbR1OygXreJC3tvv8TL7UbQG26UdbINqNSYqa2JQ8NVyMAc7Dvvr6UDwyHHfvv2Pk6EU6OeT7ZW2SH00NErO5PjM");

    // The items the customer wants to buy
    var purchase = {
      items: [{ id: "xl-tshirt" }]
    };

    // Disable the button until we have Stripe set up on the page
    document.querySelector("button").disabled = true;
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(purchase)
    })
      .then(function(result) {
        return result.json();
      })
      .then(function(data) {
        var elements = stripe.elements();
        var style = {
          base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d"
            }
          },
          invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        };
        var card = elements.create("card", { style: style });
        // Stripe injects an iframe into the DOM
        card.mount("#card-element");
        card.on("change", function (event) {
          // Disable the Pay button if there are no card details in the Element
          document.querySelector("button").disabled = event.empty;
          document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
        });
        var form = document.getElementById("payment-form");
        form.addEventListener("submit", function(event) {
          event.preventDefault();
          // Complete payment when the submit button is clicked
          payWithCard(stripe, card, data.clientSecret);
        });
      });

      // Calls stripe.confirmCardPayment
      // If the card requires authentication Stripe shows a pop-up modal to
      // prompt the user to enter authentication details without leaving your page.
      var payWithCard = function(stripe, card, clientSecret) {
        loading(true);
        stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: card
          }
        })
        .then(function(result) {
          if (result.error) {
            // Show error to your customer
            showError(result.error.message);
          } else {
            // The payment succeeded!
            orderComplete(result.paymentIntent.id);
          }
        });
      };

      // Shows a success message when the payment is complete
      var orderComplete = function(paymentIntentId) {
        loading(false);
        document
          .querySelector(".result-message a")
          .setAttribute(
            "href",
            "https://dashboard.stripe.com/test/payments/" + paymentIntentId
          );
        document.querySelector(".result-message").classList.remove("hidden");
        document.querySelector("button").disabled = true;
      };

      // Show the customer the error from Stripe if their card fails to charge
      var showError = function(errorMsgText) {
        loading(false);
        var errorMsg = document.querySelector("#card-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function() {
          errorMsg.textContent = "";
        }, 4000);
      };

      // Show a spinner on payment submission
      var loading = function(isLoading) {
        if (isLoading) {
          // Disable the button and show a spinner
          document.querySelector("button").disabled = true;
          document.querySelector("#spinner").classList.remove("hidden");
          document.querySelector("#button-text").classList.add("hidden");
        } else {
          document.querySelector("button").disabled = false;
          document.querySelector("#spinner").classList.add("hidden");
          document.querySelector("#button-text").classList.remove("hidden");
        }
      };*/
  }

  getProjects(){
    this.projectService.getProjects().subscribe(res => {
      this.projectService.projects = res as Project[];
      //console.log(this.appProjects);
    });
  }

}
