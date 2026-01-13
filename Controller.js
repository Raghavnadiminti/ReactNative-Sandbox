const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const ManipulateCode = (code) => {
  const filePath = path.join("/home/ec2-user/rama/ram", "App.js");

  fs.writeFileSync(filePath, code, "utf8");

  console.log("App.js updated successfully!");
};

const buildImage = (imageName, folder) => {
  return new Promise((resolve, reject) => {
    const absPath = path.resolve(folder);
    const cmd = `sudo docker build -t ${imageName} "/home/ec2-user/rama/ram"`;

    console.log("Running:", cmd);

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("Build failed:", stderr);
        return reject(error);
      }

      console.log("Build success:", stdout);
      resolve(true);
    });
  });
};

const runImage = (imageName,port) => {
  return new Promise((resolve, reject) => {
    // const cmd = `sudo docker run -d -p ${port}:19006 ${imageName}`;
    console.log(imageName,port)
    // exec(cmd, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error("Run failed:", stderr);
    //     return reject(error);
    //   }

    //   const containerId = stdout.trim();

    //   exec(
    //     `sudo docker inspect ${containerId} --format="{{(index (index .NetworkSettings.Ports \\"19006/tcp\\") 0).HostPort}}"`,
    //     (err, portStdout) => {
    //       if (err) return reject(err);

    //       const port = portStdout.trim();

    //       resolve({
    //         containerId,
    //         port,
    //       });
    //     }
    //   );
    // });
  });
};

module.exports = {
  ManipulateCode,
  buildImage,
  runImage,
};
