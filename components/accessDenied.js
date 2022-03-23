import { signIn } from "next-auth/react";

import Image from "next/image";
export default function AccessDenied() {
  return (
    <>
      <div className="flex-grow">
        <div className="bg-fondo hero h-screen">
          <div className="card w-100 bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="max-w-md">
                <h1 className="text-3xl text-red-500">Acceso Denegado</h1>

                <button
                  onClick={() => signIn("github")}
                  className="btn btn-md mt-10 text-white"
                >
                  <Image
                    src="/icons8-github-30.png"
                    width="30"
                    height="30"
                    className="mx-4"
                  />{" "}
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
