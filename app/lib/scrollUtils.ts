/**
 * Scrolls to a section on the page with smooth behavior.
 * @param sectionId - The ID of the section element to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[scrollToSection] Element with id "${sectionId}" not found.`);
    }
  }
};
