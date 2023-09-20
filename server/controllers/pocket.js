import axios from "axios"

export const getReadingList = async (req = request, res = response) => {
  const token = process.env.POCKET_TOKEN
  const url = `${process.env.POCKET_API_URL}?consumer_key=${process.env.POCKET_CLIENT}&access_token=${token}&sort=newest&state=unread`
  const data = await axios
    .post(url)
    .then((response) => {
      const data = response.data.list
      return data
    })
    .catch((error) => {
      console.log("error  🤌🏽", error)
    })

  const result = Object.keys(data)
    .map((key) => data[key])
    .slice(0, 2)
  res.json({ result })
}
