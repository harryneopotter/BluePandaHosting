/**
 * Scrolls to a section on the page with smooth behavior.
 * @param sectionId - The ID of the section element to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
