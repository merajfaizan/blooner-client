const ContactUs = () => {
  return (
    <section className="py-5 px-3">
      <h1 className="text-3xl text-center font-bold font-mono my-5">
        Contact Us
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-5">
        <form className="flex-1">
          <div className="flex gap-4">
            <div className="flex flex-col gap-px font-medium w-full">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="john doe"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col gap-px font-medium w-full">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="maruf@gmail.com"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-px font-medium">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="Need Bloods"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col gap-px font-medium">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Type here"
              className="textarea textarea-bordered textarea-lg w-full"
            ></textarea>
          </div>
          <input
            className="w-full text-lg font-medium bg-[#1a1a1a] text-white rounded cursor-pointer my-4 py-2"
            type="submit"
            value="Submit"
          />
        </form>
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-3xl ">Query at:</h2>
          <h4 className="text-xl py-2">Phone: +8801611111111</h4>
          <h4 className="text-xl">E-mail: info@blooner.com</h4>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
