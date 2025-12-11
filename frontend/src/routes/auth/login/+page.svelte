<script lang="ts">
  import { goto } from "$app/navigation";
  import Loader from "$lib/components/Loader.svelte";
  import { loginApi } from "$lib/services/auth.api";

  let loading: boolean = $state(false);
  let apiError: string = $state("");
  let email: string = $state("");
  let password: string = $state("");
  let emailError: string = $state("");
  let passwordError: string = $state("");
  let isEmailTouched: boolean = $state(false);
  let isPasswordTouched: boolean = $state(false);

  let showPassword: boolean = $state(false);

  function validateEmail() {
    if (!email.trim()) {
      emailError = "Email is required";
    } else {
      emailError = "";
    }
  }

  function validatePassword() {
    if (!password.trim()) {
      passwordError = "Password is required";
    } else {
      passwordError = "";
    }
  }

  const isFormValid = $derived(
    !emailError && !passwordError && isEmailTouched && isPasswordTouched
  );

  const togglePassword = async () => {
    showPassword = !showPassword;
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    validateEmail();
    validatePassword();
    if (!isFormValid) return;

    try {
      loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await loginApi(email, password);
      if (result.message == "Ok") {
        localStorage.setItem("access_token", result.data.accessToken);
        localStorage.setItem("refresh_token", result.data.refreshToken);
        localStorage.setItem("role", result.data.user.role);

        if (result.data.user.role == "admin") {
          goto("/admin/dashboard");
        } else {
          goto("/user/profile");
        }
      } else {
        apiError =
          (!result.success && result.message) ||
          "Login failed. Please try again.";
      }
    } catch (error) {
      loading = false;
      console.log("Failed login ", error);
    } finally {
      loading = false;
    }
  };
</script>

<div class="container">
  <div class="left-section">
    <img src="/login-banner.svg" alt="Login Illustration" />
  </div>

  <div class="right-section">
    <h2>Welcome Back!</h2>
    <p class="subtitle">Please log in to continue</p>

    <form onsubmit={handleSubmit}>
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
        {#if apiError}
          <p class="error">{apiError}</p>
        {/if}
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="submit-btn"
        disabled={!isFormValid || loading}>Login</button
      >

      <p class="footer-text">
        Already have an account? <a href="/auth/register">Sign Up</a>
      </p>
    </form>
  </div>
</div>

<style>
  .container {
    background: #e8e9ef;
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
    background: white;
    border-radius: 0 5px 5px 0;
  }

  h2 {
    font-size: 24px;
    color: #2d3748;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .subtitle {
    color: #a0aec0;
    font-size: 13px;
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
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    font-size: 1em;
    transition: all 0.3s;
    background: #f7fafc;
    text-indent: 3em;
  }

  .input-group input:focus {
    outline: none;
    border-color: #d4a76a;
    background: white;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 3px;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: #1c4c69;
    color: white;
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
    color: #718096;
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
