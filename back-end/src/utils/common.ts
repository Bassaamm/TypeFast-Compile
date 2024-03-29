import child_process from "child_process";

export const randomString = (size = 10) => {
  return require("crypto").randomBytes(size).toString("hex");
};

export function execShellCommand(cmd: string, timeout = 7000) {
  const exec = child_process.exec;
  return new Promise((resolve, reject) => {
    exec(cmd, { timeout }, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(error);
        if (error.killed) return resolve({ timoutErr: "Timout Error" });
      }
      resolve({ stdout, stderr });
    });
  });
}
