/**
 * Off-screen honeypot input. Hidden from real users; bots that fill the `company`
 * field are silently rejected server-side in `/api/contact`.
 */
export const HoneypotInput = () => (
  <input
    type="text"
    name="company"
    tabIndex={-1}
    autoComplete="off"
    aria-hidden="true"
    className="absolute -left-[9999px] h-0 w-0 opacity-0"
  />
);