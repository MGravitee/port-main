



function DeskNav() {

    const navigate = (anchor: string) => {
        const targetElement = document.querySelector(anchor);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      };

  return (
    <>
        <nav>
            <ul
            className="hidden flex-col gap-5 rounded-xl bg-navigation px-[0.4rem] py-3 shadow-lg lg:inline-flex"
            >
                    <li
                        className="navlistitem list-none shadow-sm transition-all hover:translate-y-[-0.125rem]"
                    >
                        <a
                        onClick={navigate(projects-section)}
                        aria-label="Navigate to Featured Work section"
                        role="button"
                        >
                        <SVGProjects class="h-6" />
                        </a>
                    </li>
                    <li
                        className="navlistitem list-none shadow-sm transition-all hover:translate-y-[-0.125rem]"
                    >
                        <a
                        @click.prevent="navigate('#about')"
                        aria-label="Navigate to About section"
                        role="button"
                        >
                        <SVGPerson class="h-6" />
                        </a>
                    </li>
                    <li
                        className="navlistitem list-none shadow-sm transition-all hover:translate-y-[-0.125rem]"
                    >
                        <a
                        @click.prevent="navigate('#stack')"
                        aria-label="Navigate to Stack section"
                        role="button"
                        >
                        <SVGStack class="h-6" />
                        </a>
                    </li>
            </ul>
        </nav>
    </>
    
  )
}
export default DeskNav