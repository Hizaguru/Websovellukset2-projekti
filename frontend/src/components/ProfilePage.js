const firstName = "Matti"
const lastName = "Meikäläinen"
const email = "matti.meikalainen@gmail.com"
const picUrl = "https://s3.amazonaws.com/files.enjin.com/821401/module_header/26639473/background/websiteowlbanner.png"

const Header = (input) => {
    return(
        <div>
            <h1>{input.header}</h1>
        </div>
    )
}

const profilePage = () => {


    return (
        <section>
            <Header header={firstName+" "+lastName}/>
            <img src="https://s3.amazonaws.com/files.enjin.com/821401/module_header/26639473/background/websiteowlbanner.png"/>
        </section>
    )
}

export default profilePage