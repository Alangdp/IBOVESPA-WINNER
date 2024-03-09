import React from "react"

function Home2() {
    return (
        <div>

            <header className="bg-blue-950 h-10 flex justify-around align-middle py-1 content-center">
                <div className="flex flex-row">
                    <img src="" alt="Logo"></img>
                    <div className="font-semibold text-white">CPI</div>
                </div>
                <div className="flex justify-around">
                    <a className="font-semibold text-white" href="index.html">Home</a>
                    <a className="font-semibold text-white mx-12" href="">Contato</a>
                    <a className="font-semibold text-white space-x-8" href="">Ações</a>
                </div>
                <div className="flex flex-row space-x-1">
                    <a className="font-semibold text-white" href="">Login</a>
                    <div className="flex justify-center content-center bg-blue-700 h-8 w-20 rounded-lg"><a className="font-bold text-white" href="">Registro</a></div>
                </div>
            </header>
            <main>
                <section className="h-40 bg-slate-700">

                </section>
                <section className="flex flex-row justify-evenly">
                    <div className="flex flex-col bg-slate-950">
                        <div className="text-white size-12">Ações</div>
                        <div className="self-end text-blue-400">test</div>
                    </div>
                    <div className="h-20 w-40 bg-blue-950 flex flex-col justify-start  text-white">
                        <div>test</div>
                        <div>Test</div>
                    </div>
                    <div className="h-20 w-40 bg-blue-950 flex flex-col justify-start text-white">
                        <div>test</div>
                        <div>Test</div>
                    </div>
                    <div className="h-20 w-40 bg-blue-950 flex flex-col justify-start text-white">
                        <div>test</div>
                        <div>Test</div>
                    </div>
                    <div className="h-20 w-40 bg-blue-950 flex flex-col justify-start text-white">
                        <div>test</div>
                        <div>Test</div>
                    </div>
                </section>
                <section className="flex flex-row justify-evenly">
                    <div></div>
                </section>
            </main>
        </div>
    )
}

export { Home2 }