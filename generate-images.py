import cv2


def genereate_image(image_url, rangeValue):
    image = cv2.imread(image_url)  # read image
    cropped = image[0:2100, 0:2100]  # crop image

    cv2.imwrite('imagePy.jpg', cropped)  # save image to disk

    value = int((2100 / rangeValue) - 1)  # calculate value
    vj = 0  # vertical jump
    vk = value  # vertical jump final

    ind = 1  # index
    for i in range(0, rangeValue):
        vi = 0  # horizontal jump
        vf = value  # horizontal jump final
        for j in range(0, rangeValue):

            newImage = image[vj:vk, vi:vf]  # crop image
            cv2.imwrite('images/image' + str(rangeValue)+'-' +
                        str(ind) + '.jpg', newImage)  # save image to disk
            vi = vf + 1  # increase horizontal jump
            vf = vf + value  # increase horizontal jump final
            ind += 1  # increase index
        vj = vk + 1  # increase vertical jump
        vk = vk + value  # increase vertical jump final


def main():
    # generate images 3x3 (9 images)
    # generate images 4x4 (16 images)
    # generate images 5x5 (25 images)
    for i in range(3, 6):
        genereate_image('sonic.jpg', i)


main()
