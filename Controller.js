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
const runImage = async (imageName, port) => {
  try {
 
    await killContainersByImage(imageName);

    const cmd = `sudo docker run -d -p ${port}:19006 ${imageName}`;
    console.log(imageName, port);

    const containerId = await new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error("Run failed:", stderr);
          return reject(error);
        }
        resolve(stdout.trim());
      });
    });

    const port1 = await new Promise((resolve, reject) => {
      exec(
        `sudo docker inspect ${containerId} --format="{{(index (index .NetworkSettings.Ports \\"19006/tcp\\") 0).HostPort}}"`,
        (err, stdout) => {
          if (err) return reject(err);
          resolve(stdout.trim());
        }
      );
    });

    return { containerId, port1 };
  } catch (err) {
    throw err;
  }
};

const killContainersByImage = (imageName) => {
  return new Promise((resolve, reject) => {
    const cmd = `sudo docker ps -aq --filter ancestor=${imageName}`;

    exec(cmd, (err, stdout) => {
      if (err) return reject(err);

      const ids = stdout.trim();
      if (!ids) {
        return resolve("No containers found for this image");
      }

      const killCmd = `sudo docker rm -f ${ids}`;
      exec(killCmd, (err2) => {
        if (err2) return reject(err2);
        resolve(`Killed and removed containers: ${ids}`);
      });
    });
  });
};

module.exports = {
  ManipulateCode,
  buildImage,
  runImage,
  killContainersByImage,
};