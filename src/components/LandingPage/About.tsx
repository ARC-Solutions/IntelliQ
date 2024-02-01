const About = () => {
    return (
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-8 bg-transparent"
                 id="about">
            <h2 className="text-4xl font-bold text-center">About Us</h2>
            <a href="https://www.producthunt.com/posts/intelliq?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-intelliq"
               target="_blank"><img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=430933&theme=dark"
                alt="IntelliQ - Take&#0032;a&#0032;step&#0032;beyond&#0032;conventional&#0032;quiz&#0032;platforms&#0046; | Product Hunt"
                style={{width: '250px', height: '54px'}}/></a>
            <p className="text-lg text-center max-w-lg">
                We are ARC-Solutions, a team of AI enthusiasts who believe in the power of personalized learning.
            </p>
        </section>
    )
};

export default About;