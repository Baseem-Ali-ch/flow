<script lang="ts">
  import { goto } from "$app/navigation";
  import Loader from "$lib/components/Loader.svelte";
  import { registerApi } from "$lib/services/auth.api";
  import {
    confirmPasswordValidator,
    emailValidator,
    passwordValidator,
    phoneNumberValidator,
    usernameValidator,
  } from "$lib/validators";

  let loading: boolean = $state(false);
  let apiError: string = $state("");

  let username: string = $state("");
  let email: string = $state("");
  let phone: string = $state("");
  let password: string = $state("");
  let confirmPassword: string = $state("");

  let usernameError: string | undefined = $state("");
  let emailError: string | undefined = $state("");
  let phoneNumberError: string | undefined = $state("");
  let passwordError: string | undefined = $state("");
  let confirmPasswordError: string | undefined = $state("");

  let isUsernameTouched: boolean = $state(false);
  let isEmailTouched: boolean = $state(false);
  let isPhoneNumberTouched: boolean = $state(false);
  let isPasswordTouched: boolean = $state(false);
  let isConfirmPasswordTouched: boolean = $state(false);

  let showPassword: boolean = $state(false);
  let showConfirmPassword: boolean = $state(false);

  function validateUsername() {
    usernameError = usernameValidator(username);
  }

  function validateEmail() {
    emailError = emailValidator(email);
  }

  function validatePhoneNumber() {
    phoneNumberError = phoneNumberValidator(phone);
  }

  function validatePassword() {
    passwordError = passwordValidator(password);
  }

  function validateConfirmPassword() {
    confirmPasswordError = confirmPasswordValidator(password, confirmPassword);
  }

  const isFormValid = $derived(
    !usernameError &&
      !emailError &&
      !phoneNumberError &&
      !passwordError &&
      !confirmPasswordError &&
      isUsernameTouched &&
      isEmailTouched &&
      isPhoneNumberTouched &&
      isPasswordTouched &&
      isConfirmPasswordTouched
  );

  const togglePassword = async () => {
    showPassword = !showPassword;
  };

  const toggleConfirmPassword = async () => {
    showConfirmPassword = !showConfirmPassword;
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    validateUsername();
    validateEmail();
    validatePhoneNumber();
    validatePassword();
    validateConfirmPassword();

    if (!isFormValid) return;

    try {
      loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await registerApi(username, email, phone, password);
      if (result.message == "Ok") {
        goto("/auth/verify-email");
      } else {
        apiError = result.message || "Register failed. Please try again.";
      }
    } catch (error) {
      loading = false;
      console.log("Failed register "), error;
    } finally {
      loading = false;
    }
  };
</script>

<div class="container">
  <div class="left-section">
    <img src="/register-banner.svg" alt="Registration Illustration" />
  </div>

  <div class="right-section">
    <h2>Create Your Account</h2>
    <p class="subtitle">Fill in your details to get started</p>

    <form onsubmit={handleSubmit}>
      <!-- Username -->
      <div class="input-group">
        <div class="input-wrapper">
          <img src="/icons/user.svg" class="icon" alt="user" />
          <input
            type="text"
            placeholder="JohnDoe12"
            bind:value={username}
            oninput={validateUsername}
            onblur={() => {
              isUsernameTouched = true;
              validateUsername();
            }}
          />
        </div>
        {#if isUsernameTouched && usernameError}
          <p class="error">{usernameError}</p>
        {/if}
      </div>

      <!-- Email -->
      <div class="input-group">
        <div class="input-wrapper">
          <img src="/icons/mail.svg" class="icon" alt="email" />
          <input
            type="email"
            placeholder="john.doe@example.com"
            bind:value={email}
            oninput={validateEmail}
            onblur={() => {
              isEmailTouched = true;
              validateEmail();
            }}
          />
        </div>
        {#if isEmailTouched && emailError}
          <p class="error">{emailError}</p>
        {/if}
      </div>

      <!-- Phone -->
      <div class="input-group">
        <div class="input-wrapper">
          <img src="/icons/phone.svg" class="icon" alt="phone" />
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            bind:value={phone}
            oninput={validatePhoneNumber}
            onblur={() => {
              isPhoneNumberTouched = true;
              validatePhoneNumber();
            }}
          />
        </div>
        {#if isPhoneNumberTouched && phoneNumberError}
          <p class="error">{phoneNumberError}</p>
        {/if}
      </div>

      <!-- Password -->
      <div class="input-group password-field">
        <div class="input-wrapper">
          <img src="/icons/lock-keyhole.svg" class="icon" alt="password" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            bind:value={password}
            oninput={validatePassword}
            onblur={() => {
              isPasswordTouched = true;
              validatePassword();
            }}
          />
          <button
            class="toggle-password-btn"
            type="button"
            onclick={togglePassword}
          >
            <img
              src={showPassword ? "/icons/eye.svg" : "/icons/eye-off.svg"}
              class="toggle-eye"
              id="togglePassword"
              alt="toggle password"
            />
          </button>
        </div>
        {#if isPasswordTouched && passwordError}
          <p class="error">{passwordError}</p>
        {/if}
      </div>

      <!-- Confirm Password -->
      <div class="input-group password-field">
        <div class="input-wrapper">
          <img src="/icons/lock-keyhole.svg" class="icon" alt="confirm" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            id="confirmPassword"
            bind:value={confirmPassword}
            oninput={validateConfirmPassword}
            onblur={() => {
              isConfirmPasswordTouched = true;
              validateConfirmPassword();
            }}
          />
          <button
            class="toggle-password-btn"
            type="button"
            onclick={toggleConfirmPassword}
          >
            <img
              src={showConfirmPassword
                ? "/icons/eye.svg"
                : "/icons/eye-off.svg"}
              class="toggle-eye"
              id="togglePassword"
              alt="toggle password"
            />
          </button>
        </div>
        {#if isConfirmPasswordTouched && confirmPasswordError}
          <p class="error">{confirmPasswordError}</p>
        {/if}
      </div>

      <!-- Terms -->
      <div class="checkbox-group">
        <input type="checkbox" id="terms" required />
        <label for="terms"
          >I agree to the <a href="/terms">Terms & Conditions</a></label
        >
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="submit-btn"
        disabled={!isFormValid || loading}>Register</button
      >

      <p class="footer-text">
        Already have an account? <a href="/auth/login">Sign In</a>
      </p>
    </form>
  </div>
</div>
1

<style>
  .container {
    background: var(--card-color);
    padding: 3.5em;
    display: flex;
  }

  .left-section {
    background: linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%);
    padding: 60px 40px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 0 0 5px;
  }

  .left-section img {
    width: 86%;
  }

  .right-section {
    padding: 50px 45px;
    flex: 1;
    background: var(--accent-one);
    border-radius: 0 5px 5px 0;
  }

  h2 {
    font-size: 28px;
    color: var(--primary-font-colo);
    margin-bottom: 8px;
    font-weight: 600;
  }

  .subtitle {
    color: var(--secondary-font-color);
    font-size: 18px;
    margin-bottom: 30px;
  }

  .input-group {
    position: relative;
    margin-bottom: 18px;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    width: 18px;
    opacity: 0.7;
  }

  .toggle-password-btn {
    position: absolute;
    background: none;
    border: none;
    right: 14px;
    top: 50%;
  }

  .toggle-eye {
    transform: translateY(-50%);
    width: 20px;
    cursor: pointer;
    opacity: 0.7;
  }

  input {
    width: 100%;
    padding: 1em 0;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1em;
    transition: all 0.3s;
    background: var(--input-color);
    text-indent: 3em;
  }

  .input-group input:focus {
    outline: none;
    border-color: var(--accent-two);
    background: var(--accent-one);
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 3px;
  }

  .checkbox-group {
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 13px;
    color: #718096;
  }

  .checkbox-group input {
    margin-right: 8px;
    width: 14px;
  }

  .checkbox-group a {
    margin-left: 3px;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: var(--primary-button-color);
    color: var(--accent-one);
    border: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(212, 167, 106, 0.3);
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 167, 106, 0.4);
  }

  .submit-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
  }

  .footer-text {
    text-align: center;
    margin-top: 20px;
    font-size: 13px;
    color: var(--accent-three);
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      padding: 20px;
    }

    .left-section {
      padding: 40px;
    }
  }
</style>
