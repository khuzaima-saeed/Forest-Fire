from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from datetime import date
import time
import glob
import os

def latest_download_file():
  path = "C:\\Users\\khuzaima.saeed\\Downloads\\Forest-Fire\\public"
  os.chdir(path)
  files = sorted(os.listdir(os.getcwd()), key=os.path.getmtime)
  newest = files[-1]
  return newest

folder_path = "C:\\Users\\khuzaima.saeed\\Downloads\\Forest-Fire\\public"
file_type = r'\*txt'
files = glob.glob(folder_path + file_type)
try:
  max_file = max(files, key=os.path.getctime)
  os.remove(max_file)
except:
  x=1
chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
prefs = {"download.default_directory" : "C:\\Users\\khuzaima.saeed\\Downloads\\Forest-Fire\\public",
  "download.prompt_for_download": False,
  "download.directory_upgrade": True,
  "safebrowsing.enabled": True}
chrome_options.add_experimental_option('prefs', prefs)
driver = webdriver.Chrome('chromedriver',chrome_options=chrome_options)
driver.get("https://nrt4.modaps.eosdis.nasa.gov/archive/FIRMS/suomi-npp-viirs-c2/South_Asia")
WebDriverWait(driver, 120).until(lambda x: x.find_element("xpath","/html/body/div[2]/div/div[1]/div/div/div/a"))
driver.find_element(By.XPATH, "/html/body/div[2]/div/div[1]/div/div/div/a").click()
WebDriverWait(driver, 120).until(lambda x: x.find_element("xpath","/html/body/div[2]/section[1]/form/p[1]/input"))
driver.find_element(By.XPATH, "/html/body/div[2]/section[1]/form/p[1]/input").send_keys("khuzaimasaeed@gmail.com")
driver.find_element(By.XPATH, "/html/body/div[2]/section[1]/form/p[2]/input").send_keys("Brownie@99")
driver.find_element(By.XPATH, "/html/body/div[2]/section[1]/form/p[8]/input").click()
xpath = '/html/body/div[2]/div/div[1]/div/div/div/div/div[1]/div/table/tbody/tr[61]'
WebDriverWait(driver, 120).until(lambda x: x.find_element("xpath",xpath))
driver.find_element(By.XPATH, xpath).click()
time.sleep(20)
print("File downloaded")
max_file = latest_download_file()
os.rename(max_file, "sample.txt")
print("File renamed")


