import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  age: number;
  website: string;
  birthDate: string;
  country: string;
  role: string;
  contactMethod: "email" | "phone" | "sms";
  newsletter: boolean;
  terms: boolean;
  experience: number;
  bio: string;
};

const STORAGE_KEY = "homework-form-cache";

export const ProductForm = () => {
  const { t } = useTranslation("common");
  const [cachedValues, setCachedValues] = useLocalStorage<
    Partial<FormValues>
  >(STORAGE_KEY, {});

  const defaultValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: 18,
    website: "",
    birthDate: "",
    country: "",
    role: "",
    contactMethod: "email",
    newsletter: false,
    terms: false,
    experience: 5,
    bio: "",
  };

  const mergedDefaults = {
    ...defaultValues,
    ...cachedValues,
  } as FormValues;

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: mergedDefaults,
  });

  const experienceValue = watch("experience");

  useEffect(() => {
    const subscription = watch((values) => {
      const { password, confirmPassword, ...safeValues } = values;
      setCachedValues(safeValues);
    });

    return () => subscription.unsubscribe();
  }, [setCachedValues, watch]);

  const onSubmit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Submitted form data:", data);
  };

  const handleReset = () => {
    setCachedValues({});
    reset(defaultValues);
  };

  return (
    <div className="form-card">
      <h2 className="form-title">{t("form.title")}</h2>
      <p className="form-description">{t("form.description")}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="firstName">{t("form.labels.firstName")}</label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby="firstName-error"
              {...register("firstName", {
                required: t("form.errors.firstNameRequired"),
                minLength: {
                  value: 2,
                  message: t("form.errors.firstNameMin"),
                },
              })}
            />
            <p
              id="firstName-error"
              className={`field-error ${errors.firstName ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.firstName?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="lastName">{t("form.labels.lastName")}</label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby="lastName-error"
              {...register("lastName", {
                required: t("form.errors.lastNameRequired"),
                minLength: {
                  value: 2,
                  message: t("form.errors.lastNameMin"),
                },
              })}
            />
            <p
              id="lastName-error"
              className={`field-error ${errors.lastName ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.lastName?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="email">{t("form.labels.email")}</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby="email-error"
              {...register("email", {
                required: t("form.errors.emailRequired"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("form.errors.emailInvalid"),
                },
              })}
            />
            <p
              id="email-error"
              className={`field-error ${errors.email ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.email?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="phone">{t("form.labels.phone")}</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby="phone-error"
              {...register("phone", {
                required: t("form.errors.phoneRequired"),
                pattern: {
                  value: /^\+?[0-9\s\-()]{7,}$/,
                  message: t("form.errors.phoneInvalid"),
                },
              })}
            />
            <p
              id="phone-error"
              className={`field-error ${errors.phone ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.phone?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="password">{t("form.labels.password")}</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby="password-error"
              {...register("password", {
                required: t("form.errors.passwordRequired"),
                minLength: {
                  value: 8,
                  message: t("form.errors.passwordMin"),
                },
                validate: {
                  hasNumber: (value) =>
                    /\d/.test(value) ||
                    t("form.errors.passwordNumber"),
                },
              })}
            />
            <p
              id="password-error"
              className={`field-error ${errors.password ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.password?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">
              {t("form.labels.confirmPassword")}
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby="confirmPassword-error"
              {...register("confirmPassword", {
                required: t("form.errors.confirmPasswordRequired"),
                validate: (value) =>
                  value === getValues("password") ||
                  t("form.errors.confirmPasswordMismatch"),
              })}
            />
            <p
              id="confirmPassword-error"
              className={`field-error ${errors.confirmPassword ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.confirmPassword?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="age">{t("form.labels.age")}</label>
            <input
              id="age"
              type="number"
              min={16}
              max={120}
              aria-invalid={Boolean(errors.age)}
              aria-describedby="age-error"
              {...register("age", {
                required: t("form.errors.ageRequired"),
                valueAsNumber: true,
                min: { value: 16, message: t("form.errors.ageMin") },
                max: { value: 120, message: t("form.errors.ageMax") },
              })}
            />
            <p
              id="age-error"
              className={`field-error ${errors.age ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.age?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="birthDate">{t("form.labels.birthDate")}</label>
            <input
              id="birthDate"
              type="date"
              aria-invalid={Boolean(errors.birthDate)}
              aria-describedby="birthDate-error"
              {...register("birthDate", {
                required: t("form.errors.birthDateRequired"),
              })}
            />
            <p
              id="birthDate-error"
              className={`field-error ${errors.birthDate ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.birthDate?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="website">{t("form.labels.website")}</label>
            <input
              id="website"
              type="url"
              placeholder={t("form.placeholders.website")}
              aria-invalid={Boolean(errors.website)}
              aria-describedby="website-error"
              {...register("website", {
                required: t("form.errors.websiteRequired"),
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: t("form.errors.websiteInvalid"),
                },
              })}
            />
            <p
              id="website-error"
              className={`field-error ${errors.website ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.website?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="country">{t("form.labels.country")}</label>
            <select
              id="country"
              aria-invalid={Boolean(errors.country)}
              aria-describedby="country-error"
              {...register("country", {
                required: t("form.errors.countryRequired"),
              })}
            >
              <option value="">{t("form.options.selectOne")}</option>
              <option value="israel">{t("form.options.countries.israel")}</option>
              <option value="usa">{t("form.options.countries.usa")}</option>
              <option value="uk">{t("form.options.countries.uk")}</option>
              <option value="germany">
                {t("form.options.countries.germany")}
              </option>
            </select>
            <p
              id="country-error"
              className={`field-error ${errors.country ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.country?.message ?? ""}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="role">{t("form.labels.role")}</label>
            <select
              id="role"
              aria-invalid={Boolean(errors.role)}
              aria-describedby="role-error"
              {...register("role", {
                required: t("form.errors.roleRequired"),
              })}
            >
              <option value="">{t("form.options.selectOne")}</option>
              <option value="developer">
                {t("form.options.roles.developer")}
              </option>
              <option value="designer">
                {t("form.options.roles.designer")}
              </option>
              <option value="pm">{t("form.options.roles.pm")}</option>
              <option value="qa">{t("form.options.roles.qa")}</option>
            </select>
            <p
              id="role-error"
              className={`field-error ${errors.role ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.role?.message ?? ""}
            </p>
          </div>

          <fieldset
            className="form-field form-span-2"
            aria-describedby="contactMethod-error"
            aria-invalid={Boolean(errors.contactMethod)}
          >
            <legend>{t("form.labels.contactMethod")}</legend>
            <div className="control-group">
              <label className="control control--radio">
                <input
                  className="visually-hidden-input"
                  type="radio"
                  value="email"
                  {...register("contactMethod", {
                    required: t("form.errors.contactMethodRequired"),
                  })}
                />
                <span className="control__indicator" aria-hidden="true" />
                <span>{t("form.options.contactMethods.email")}</span>
              </label>
              <label className="control control--radio">
                <input
                  className="visually-hidden-input"
                  type="radio"
                  value="phone"
                  {...register("contactMethod", {
                    required: t("form.errors.contactMethodRequired"),
                  })}
                />
                <span className="control__indicator" aria-hidden="true" />
                <span>{t("form.options.contactMethods.phone")}</span>
              </label>
              <label className="control control--radio">
                <input
                  className="visually-hidden-input"
                  type="radio"
                  value="sms"
                  {...register("contactMethod", {
                    required: t("form.errors.contactMethodRequired"),
                  })}
                />
                <span className="control__indicator" aria-hidden="true" />
                <span>{t("form.options.contactMethods.sms")}</span>
              </label>
            </div>
            <p
              id="contactMethod-error"
              className={`field-error ${errors.contactMethod ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.contactMethod?.message ?? ""}
            </p>
          </fieldset>

          <div className="form-field form-span-2">
            <label htmlFor="experience">
              {t("form.experienceLabel", { value: experienceValue })}
            </label>
            <input
              id="experience"
              type="range"
              min={1}
              max={10}
              aria-invalid={Boolean(errors.experience)}
              aria-describedby="experience-error"
              {...register("experience", {
                required: t("form.errors.experienceRequired"),
                valueAsNumber: true,
              })}
            />
            <p
              id="experience-error"
              className={`field-error ${errors.experience ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.experience?.message ?? ""}
            </p>
          </div>

          <div className="form-field form-span-2">
            <label htmlFor="bio">{t("form.labels.bio")}</label>
            <textarea
              id="bio"
              rows={4}
              aria-invalid={Boolean(errors.bio)}
              aria-describedby="bio-error"
              {...register("bio", {
                required: t("form.errors.bioRequired"),
                minLength: {
                  value: 20,
                  message: t("form.errors.bioMin"),
                },
              })}
            />
            <p
              id="bio-error"
              className={`field-error ${errors.bio ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.bio?.message ?? ""}
            </p>
          </div>

          <div className="form-field form-span-2">
            <label className="control control--checkbox">
              <input
                className="visually-hidden-input"
                type="checkbox"
                {...register("newsletter")}
              />
              <span className="control__indicator" aria-hidden="true" />
              <span>{t("form.labels.newsletter")}</span>
            </label>
          </div>

          <div className="form-field form-span-2">
            <label className="control control--checkbox">
              <input
                className="visually-hidden-input"
                type="checkbox"
                aria-invalid={Boolean(errors.terms)}
                aria-describedby="terms-error"
                {...register("terms", {
                  required: t("form.errors.termsRequired"),
                })}
              />
              <span className="control__indicator" aria-hidden="true" />
              <span>{t("form.labels.terms")}</span>
            </label>
            <p
              id="terms-error"
              className={`field-error ${errors.terms ? "is-visible" : ""}`}
              aria-live="polite"
            >
              {errors.terms?.message ?? ""}
            </p>
          </div>
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            className="form-submit"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting
              ? t("form.buttons.submitting")
              : t("form.buttons.submit")}
          </Button>
          <Button
            type="button"
            className="form-reset"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            {t("form.buttons.reset")}
          </Button>
          <p className="form-cache-note">
            {t("form.cacheNote")}
          </p>
        </div>
      </form>
    </div>
  );
};
